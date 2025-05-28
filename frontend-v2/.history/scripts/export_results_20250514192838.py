"""
P.Y.T.H.I.A. - Phase 6: Export to CSV/JSON for Looker Studio
------------------------------------------------------------
Extract predictions and recommendations from MongoDB and
export them to the /exports/ folder in clean format.
"""

import os
import pandas as pd
from pymongo import MongoClient

# ------------------- CONFIG ------------------- #
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "pythia"
EXPORT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "exports")
os.makedirs(EXPORT_DIR, exist_ok=True)

# Connect to DB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# ------------------- EXPORT PREDICTIONS ------------------- #
print("Exporting predictions_logs...")
preds = list(db["predictions_logs"].find({}, {"_id": 0}))
df_preds = pd.json_normalize(preds)
df_preds.to_csv(os.path.join(EXPORT_DIR, "predictions_export.csv"), index=False)
df_preds.to_json(os.path.join(EXPORT_DIR, "predictions_export.json"), orient="records", indent=2)

# ------------------- EXPORT RECOMMENDATIONS ------------------- #
print("Exporting recommendations...")
recs = list(db["recommendations"].find({}, {"_id": 0}))
df_recs = pd.json_normalize(recs)
df_recs.to_csv(os.path.join(EXPORT_DIR, "recommendations_export.csv"), index=False)
df_recs.to_json(os.path.join(EXPORT_DIR, "recommendations_export.json"), orient="records", indent=2)

print("✔️ Export completed: /exports/")
