# backend/controllers/recommend_controller.py

import joblib
import numpy as np
from backend.utils.db import get_db

def generate_recommendation(data):
    reg_model = joblib.load("models/poisson_model.pkl")

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
    db.recommendations.insert_one({
        "input_budget": data.get("Budget"),
        "recommendation": recommendation
    })

    return recommendation
