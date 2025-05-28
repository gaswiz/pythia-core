# generate_summary.py (place this in /Pythia/experiments)

import json
import os

experiment_dirs = [
    "kaggle_campaign",
    "advertising_standard",
    "advertising_classified",
    "ecommerce_shop"
]

summary = []

for exp in experiment_dirs:
    result_path = os.path.join(exp, "results.json")
    try:
        with open(result_path, 'r') as f:
            data = json.load(f)
            summary.append({
                "dataset": data.get("dataset"),
                "model": data.get("model"),
                "r2_score": data.get("r2_score"),
                "mae": data.get("mae"),
                "accuracy": data.get("accuracy_score"),
                "features": data.get("features_used"),
                "timestamp": data.get("timestamp")
            })
    except Exception as e:
        summary.append({"dataset": exp, "error": str(e)})

with open("experiment_summary.json", "w") as f:
    json.dump(summary, f, indent=4)

print("\nSummary written to experiment_summary.json")