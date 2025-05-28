# scripts/export_results.py

import pandas as pd
from pymongo import MongoClient
import os

client = MongoClient("mongodb://localhost:27017/")
db = client["pythia_db"]

print("Exporting predictions_logs...")
preds = pd.DataFrame(list(db.predictions_logs.find()))
preds.to_csv("exports/predictions_logs.csv", index=False)

print("Exporting recommendations...")
recs = pd.DataFrame(list(db.recommendations.find()))
recs.to_csv("exports/recommendations.csv", index=False)

print("✔️ Export completed: /exports/")
