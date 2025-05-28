# experiments/advertising_standard/run_experiment.py

import pandas as pd
import json
import os
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
from joblib import dump
from datetime import datetime

# Load dataset path
DATA_PATH = os.path.join("../../../", "advertising_dataset.csv")

# Load and inspect dataset
df = pd.read_csv(DATA_PATH)

# Select relevant columns
columns = ['click_through_rate', 'cost_per_click', 'ROI']
df = df[columns].dropna()

# Define features and target
X = df[['click_through_rate', 'cost_per_click']]
y = df['ROI']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)

# Save model
MODEL_PATH = os.path.join(".", "model_advertising_standard.pkl")
dump(model, MODEL_PATH)

# Save results
results = {
    "dataset": "advertising_standard",
    "model": "LinearRegression",
    "r2_score": r2,
    "mae": mae,
    "features_used": ['click_through_rate', 'cost_per_click'],
    "timestamp": datetime.now().isoformat()
}

with open("results.json", "w") as f:
    json.dump(results, f, indent=4)

print("Experiment complete. Results saved.")