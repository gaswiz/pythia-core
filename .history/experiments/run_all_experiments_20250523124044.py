# experiments/run_all_experiments.py

import subprocess
import os

# Paths to each experiment folder
experiment_folders = [
    "kaggle_campaign",
    "advertising_standard",
    "advertising_classified",
    "ecommerce_shop"
]

# Base path (this script is in /experiments/)
base_path = os.path.dirname(os.path.abspath(__file__))

# Run each experiment script
for folder in experiment_folders:
    exp_path = os.path.join(base_path, folder, "run_experiment.py")
    print(f"\n--- Running: {folder} ---")
    subprocess.run(["python3", exp_path])
