import joblib
import numpy as np
from pathlib import Path

from backend.utils.db import get_db


MODELS_DIR = Path(__file__).resolve().parents[2] / "models"


def predict_campaign(data):
    cls_model = joblib.load(MODELS_DIR / "logistic_roi_model.pkl")
    reg_model = joblib.load(MODELS_DIR / "poisson_click_model.pkl")

    input_features = np.array([
        data.get("Budget", 0),
        data.get("Duration", 0),
        data.get("Impressions", 0),
        data.get("Clicks", 0),
        data.get("Conversion_Rate", 0)
    ]).reshape(1, -1)

    roi_class = int(cls_model.predict(input_features)[0])
    est_clicks = int(reg_model.predict(input_features)[0])

    # Optional: log the prediction to MongoDB
    db = get_db()
    if db is not None:
        db.predictions_logs.insert_one({
            "input": data,
            "output": {
                "ROI_Category": roi_class,
                "Estimated_Clicks": est_clicks
            }
        })

    return {
        "ROI_Category": roi_class,
        "Estimated_Clicks": est_clicks
    }



