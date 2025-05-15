"""
P.Y.T.H.I.A. - Phase 3: Explainability and Recommendation Engine
----------------------------------------------------------------
This script loads trained models and cleaned data to:
1. Generate SHAP explanations for ROI predictions.
2. Recommend optimal campaign parameters (budget/duration) based on similar campaigns.
3. Store outputs in MongoDB.
"""

import os
import pandas as pd
import joblib
import shap
from pymongo import MongoClient
import matplotlib.pyplot as plt

# ------------------- CONFIG ------------------- #
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "pythia"
COLLECTION_NAME = "clean_campaigns"
RECOMM_COLLECTION = "recommendations"
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "models")

# ------------------- LOAD DATA & MODEL ------------------- #
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
df = pd.DataFrame(list(db[COLLECTION_NAME].find()))
cls_model = joblib.load(os.path.join(MODEL_DIR, "logistic_roi_model.pkl"))

# ------------------- SHAP Explainability ------------------- #
features = ["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"]
explainer = shap.Explainer(cls_model, df[features])
shap_values = explainer(df[features])

# Save SHAP summary bar plot
plt.figure()
shap.plots.bar(shap_values, show=False)
shap_plot_path = os.path.join(MODEL_DIR, "shap_summary_bar.png")
plt.savefig(shap_plot_path)
plt.close()

print(f"SHAP summary bar plot saved to {shap_plot_path}")

# ------------------- Campaign Recommendation ------------------- #
def recommend_campaign(budget):
    df_filtered = df[
        (df["Acquisition_Cost"] >= budget * 0.8) &
        (df["Acquisition_Cost"] <= budget * 1.2)
    ]
    if df_filtered.empty:
        return {"message": "Not enough matching data for this budget."}

    best = df_filtered.sort_values(by=["ROI", "Conversion_Rate"], ascending=False).iloc[0]
    return {
        "Recommended_Duration": float(best["Duration"]),
        "Expected_Clicks": int(best["Clicks"]),
        "Estimated_ROI": float(best["ROI"])
    }

# ------------------- Store Example Recommendations ------------------- #
recomm_collection = db[RECOMM_COLLECTION]
example_budgets = [3000, 5000, 10000]

for b in example_budgets:
    output = recommend_campaign(b)
    record = {
        "input_budget": int(b),
        "recommendation": output
    }
    recomm_collection.insert_one(record)

print("Recommendations stored in MongoDB.")
