"""
P.Y.T.H.I.A. Flask API.

Provides local prediction, recommendation, upload, and health endpoints
without requiring MongoDB to be available at import time.
"""

from __future__ import annotations

import io
from functools import lru_cache
from pathlib import Path

import joblib
import pandas as pd
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv(Path(__file__).with_name(".env"))

from backend.config import (
    FALLBACK_DATA_PATH,
    FLASK_DEBUG,
    FRONTEND_ORIGINS,
    LOGISTIC_MODEL_PATH,
    MODEL_FEATURES,
    POISSON_MODEL_PATH,
    PORT,
    SHAP_BACKGROUND_SAMPLE_SIZE,
)
from backend.utils.db import get_db

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": FRONTEND_ORIGINS}})

uploaded_background_df: pd.DataFrame | None = None


def _normalize_records(df: pd.DataFrame) -> pd.DataFrame:
    normalized = df.copy()
    for feature in MODEL_FEATURES:
        if feature not in normalized.columns:
            normalized[feature] = 0

    normalized = normalized[MODEL_FEATURES].apply(pd.to_numeric, errors="coerce")
    normalized = normalized.dropna(subset=MODEL_FEATURES)
    return normalized


def _empty_background_frame() -> pd.DataFrame:
    return pd.DataFrame([{feature: 0.0 for feature in MODEL_FEATURES}])


def _load_background_frame() -> pd.DataFrame:
    global uploaded_background_df

    if uploaded_background_df is not None and not uploaded_background_df.empty:
        return uploaded_background_df

    db = get_db()
    if db is not None:
        records = list(db["clean_campaigns"].find({}, {"_id": 0}))
        if records:
            normalized = _normalize_records(pd.DataFrame(records))
            if not normalized.empty:
                uploaded_background_df = normalized
                return normalized

    if FALLBACK_DATA_PATH.exists():
        normalized = _normalize_records(pd.read_csv(FALLBACK_DATA_PATH))
        if not normalized.empty:
            uploaded_background_df = normalized
            return normalized

    return _empty_background_frame()


@lru_cache(maxsize=1)
def _load_models():
    if not LOGISTIC_MODEL_PATH.exists():
        raise FileNotFoundError(f"Missing model file: {LOGISTIC_MODEL_PATH}")
    if not POISSON_MODEL_PATH.exists():
        raise FileNotFoundError(f"Missing model file: {POISSON_MODEL_PATH}")

    cls_model = joblib.load(LOGISTIC_MODEL_PATH)
    reg_model = joblib.load(POISSON_MODEL_PATH)
    return cls_model, reg_model


@lru_cache(maxsize=1)
def _build_explainer():
    try:
        import shap
    except Exception:
        return None

    cls_model, _ = _load_models()
    background = _load_background_frame()
    sample_size = min(SHAP_BACKGROUND_SAMPLE_SIZE, len(background))
    background_sample = background.sample(n=sample_size, random_state=1) if sample_size else _empty_background_frame()
    masker = shap.maskers.Independent(background_sample)
    try:
        return shap.Explainer(cls_model.predict_proba, masker)
    except Exception:
        return None


def _reset_runtime_state() -> None:
    _build_explainer.cache_clear()


def _coerce_feature_payload(data: dict) -> dict:
    missing = [feature for feature in MODEL_FEATURES if feature not in data]
    if missing:
        raise ValueError(f"Missing required fields: {', '.join(missing)}")

    payload = {}
    for feature in MODEL_FEATURES:
        try:
            payload[feature] = float(data[feature])
        except (TypeError, ValueError) as exc:
            raise ValueError(f"Field '{feature}' must be numeric.") from exc
    return payload


def _store_document(collection_name: str, document: dict) -> None:
    db = get_db()
    if db is None:
        return

    db[collection_name].insert_one(document)


@app.get("/health")
def healthcheck():
    mongo_connected = get_db() is not None
    return jsonify(
        {
            "status": "ok",
            "mongo_connected": mongo_connected,
            "model_files_present": LOGISTIC_MODEL_PATH.exists() and POISSON_MODEL_PATH.exists(),
        }
    )


@app.post("/predict")
def predict():
    try:
        data = request.get_json(silent=True) or {}
        payload = _coerce_feature_payload(data)
        X = pd.DataFrame([payload], columns=MODEL_FEATURES)

        cls_model, reg_model = _load_models()
        explainer = _build_explainer()

        roi_class = int(cls_model.predict(X)[0])
        clicks_pred = float(reg_model.predict(X)[0])
        shap_summary = {}
        if explainer is not None:
            try:
                shap_values = explainer(X)
                raw_values = shap_values.values
                if hasattr(raw_values, "ndim") and raw_values.ndim == 3:
                    raw_values = raw_values[0, :, 1]
                elif hasattr(raw_values, "ndim") and raw_values.ndim == 2:
                    raw_values = raw_values[0]
                shap_summary = dict(zip(MODEL_FEATURES, [float(value) for value in raw_values]))
            except Exception:
                shap_summary = {}

        response = {
            "ROI_Category": roi_class,
            "Estimated_Clicks": round(clicks_pred),
            "SHAP_Explanation": shap_summary,
        }

        _store_document("predictions_logs", {"input": payload, "output": response})
        return jsonify(response)
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except FileNotFoundError as exc:
        return jsonify({"error": str(exc)}), 500
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.get("/recommend")
def recommend():
    try:
        budget = request.args.get("budget", type=float)
        if budget is None:
            return jsonify({"error": "Query parameter 'budget' is required."}), 400

        db = get_db()
        if db is not None:
            record = db["recommendations"].find_one({"input_budget": int(budget)}, {"_id": 0})
            if record:
                return jsonify(record["recommendation"])

        background = _load_background_frame()
        window = background[
            (background["Acquisition_Cost"] >= budget * 0.8)
            & (background["Acquisition_Cost"] <= budget * 1.2)
        ]
        if window.empty:
            return jsonify({"message": "No recommendation available for this budget."}), 404

        best = window.sort_values(by=["Conversion_Rate", "Clicks"], ascending=False).iloc[0]
        recommendation = {
            "Recommended_Duration": float(best["Duration"]),
            "Expected_Clicks": int(best["Clicks"]),
            "Estimated_Conversion_Rate": float(best["Conversion_Rate"]),
        }
        return jsonify(recommendation)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.post("/upload")
def upload():
    global uploaded_background_df

    if "file" not in request.files:
        return jsonify({"error": "No file provided."}), 400

    file = request.files["file"]
    if not file or not file.filename:
        return jsonify({"error": "No file selected."}), 400

    if not file.filename.lower().endswith(".csv"):
        return jsonify({"error": "Only CSV uploads are supported."}), 400

    try:
        contents = file.read()
        df = pd.read_csv(io.BytesIO(contents))
        normalized = _normalize_records(df)
        if normalized.empty:
            return jsonify({"error": "Uploaded CSV does not contain usable model feature rows."}), 400

        uploaded_background_df = normalized
        _reset_runtime_state()

        db = get_db()
        if db is not None:
            db["clean_campaigns"].delete_many({})
            db["clean_campaigns"].insert_many(normalized.to_dict(orient="records"))

        return jsonify(
            {
                "message": "File uploaded successfully.",
                "rows_loaded": int(len(normalized)),
                "mongo_persisted": db is not None,
            }
        )
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


if __name__ == "__main__":
    app.run(debug=FLASK_DEBUG, host="0.0.0.0", port=PORT)
