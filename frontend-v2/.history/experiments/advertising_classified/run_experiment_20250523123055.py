# experiments/advertising_classified/run_experiment.py

import pandas as pd
import json
import os
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from joblib import dump
from datetime import datetime

# Load dataset path
DATA_PATH = os.path.join("../../../", "Advertising_dataset_with_character_target.csv")

# Load and inspect dataset
df = pd.read_csv(DATA_PATH)

# Select relevant columns
columns = ['click_through_rate', 'cost_per_click', 'ROI_Category']
df = df[columns].dropna()

# Encode target if it's categorical text
if df['ROI_Category'].dtype == 'object':
    df['ROI_Category'] = df['ROI_Category'].astype('category').cat.codes

# Define features and target
X = df[['click_through_rate', 'cost_per_click']]
y = df['ROI_Category']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred, output_dict=True)

# Save model
MODEL_PATH = os.path.join(".", "model_advertising_classified.pkl")
dump(model, MODEL_PATH)

# Save results
results = {
    "dataset": "advertising_classified",
    "model": "LogisticRegression",
    "accuracy_score": accuracy,
    "classification_report": report,
    "features_used": ['click_through_rate', 'cost_per_click'],
    "timestamp": datetime.now().isoformat()
}

with open("results.json", "w") as f:
    json.dump(results, f, indent=4)

print("Classification experiment complete. Results saved.")
