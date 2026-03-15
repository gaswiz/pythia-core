import joblib
import numpy as np
from pathlib import Path

try:
    from backend.utils.db import get_db
except ModuleNotFoundError:
    from utils.db import get_db


MODELS_DIR = Path(__file__).resolve().parents[2] / "models"


def generate_recommendation(data):
    reg_model = joblib.load(MODELS_DIR / "poisson_click_model.pkl")

    input_features = np.array([
        data.get("Budget", 0),
        data.get("Duration", 0),
        data.get("Impressions", 0),
        data.get("Clicks", 0),
        data.get("Conversion_Rate", 0)
    ]).reshape(1, -1)

    expected_clicks = int(reg_model.predict(input_features)[0])
    est_roi = round(data.get("Budget", 1) * data.get("Conversion_Rate", 0.1) / 100, 2)

    recommendation = {
        "Recommended_Duration": data.get("Duration", 0),
        "Expected_Clicks": expected_clicks,
        "Estimated_ROI": est_roi
    }

    db = get_db()
    if db is not None:
        db.recommendations.insert_one({
            "input_budget": data.get("Budget"),
            "recommendation": recommendation
        })

    return recommendation
