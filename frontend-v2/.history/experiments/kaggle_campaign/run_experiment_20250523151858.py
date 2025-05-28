# experiments/kaggle_campaign/run_experiment.py

import pandas as pd
import json
import os
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
from joblib import dump
from datetime import datetime
from backend.utils.experiment_logger import log_experiment_result

# Define the absolute path to the marketing campaign dataset
DATA_PATH = "/Users/konstantinospanagiotaropoulos/Desktop/College/Pythia/data/marketing_campaign_performance.csv"

# Load the dataset using pandas
# This assumes the dataset has columns like CTR (Click Through Rate), CPC (Cost Per Click), and ROI (Return on Investment)
df = pd.read_csv(DATA_PATH)

# Select only the relevant columns for modeling and drop any rows with missing values
columns = ['CTR', 'CPC', 'ROI']
df = df[columns].dropna()

# Define input features (X) and target variable (y)
X = df[['CTR', 'CPC']]  # Features used to predict ROI
y = df['ROI']           # Target output

# Split data into training (80%) and test (20%) sets with a fixed random seed for reproducibility
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize a Linear Regression model and train it on the training data
model = LinearRegression()
model.fit(X_train, y_train)

# Predict ROI on the test set based on the learned model
y_pred = model.predict(X_test)

# Evaluate the model's performance using R² and MAE metrics
r2 = r2_score(y_test, y_pred)                   # Measures variance explained by the model
mae = mean_absolute_error(y_test, y_pred)      # Average magnitude of errors in predictions

# Save the trained model as a serialized file (.pkl) for reuse or deployment
MODEL_PATH = os.path.join(".", "model_kaggle_campaign.pkl")
dump(model, MODEL_PATH)

# Create a dictionary to store the experiment results including metrics, features, and timestamp
results = {
    "dataset": "kaggle_campaign",
    "model": "LinearRegression",
    "r2_score": r2,
    "mae": mae,
    "features_used": ['CTR', 'CPC'],
    "timestamp": datetime.now().isoformat()
}

# Write the results to a local JSON file for inspection or reporting
with open("results.json", "w") as f:
    json.dump(results, f, indent=4)

# Log the same results to MongoDB for centralized tracking and future auditing
log_experiment_result("kaggle_campaign", "LinearRegression", {"r2_score": r2, "mae": mae})

# Print final confirmation message to indicate completion of the experiment
print("Kaggle campaign experiment complete. Results saved and logged to MongoDB.")
