# plot_comparisons.py (run from /Pythia/experiments)

import json
import os
import matplotlib.pyplot as plt

# Load summary data
with open("experiment_summary.json") as f:
    summary = json.load(f)

# Filter and sort experiments with regression scores
r2_data = [(item["dataset"], item.get("r2_score")) for item in summary if item.get("r2_score") is not None]
mae_data = [(item["dataset"], item.get("mae")) for item in summary if item.get("mae") is not None]

# Sort by dataset name for consistency
r2_data.sort()
mae_data.sort()

# Unpack for plotting
datasets_r2, r2_scores = zip(*r2_data)
datasets_mae, mae_scores = zip(*mae_data)

# R² Score Plot
plt.figure(figsize=(10, 5))
plt.bar(datasets_r2, r2_scores)
plt.title("R² Scores Across Datasets")
plt.ylabel("R² Score")
plt.xlabel("Dataset")
plt.ylim(0, 1)
plt.grid(axis='y')
plt.tight_layout()
plt.savefig("comparison_r2_scores.png")
plt.close()

# MAE Plot
plt.figure(figsize=(10, 5))
plt.bar(datasets_mae, mae_scores, color='orange')
plt.title("Mean Absolute Error (MAE) Across Datasets")
plt.ylabel("MAE")
plt.xlabel("Dataset")
plt.grid(axis='y')
plt.tight_layout()
plt.savefig("comparison_mae_scores.png")
plt.close()

print("✅ Plots saved as 'comparison_r2_scores.png' and 'comparison_mae_scores.png'")
