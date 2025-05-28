# experiments/ecommerce_shop/run_experiment.py

import pandas as pd
import json
import os
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
from joblib import dump
from datetime import datetime
from backend.utils.experiment_logger import log_experiment_result

# Define the absolute path to the dataset
DATA_PATH = "/Users/konstantinospanagiotaropoulos/Desktop/College/Pythia/data/final_shop_6modata.csv"

# Load dataset from CSV
df = pd.read_csv(DATA_PATH)

# Keep only relevant columns for model input/output
columns = ['CTR', 'CPC', 'P&L']
df = df[columns].dropna()  # Remove rows with missing values

# Define input features and target variable
X = df[['CTR', 'CPC']]
y = df['P&L']

# Split the dataset into training and testing subsets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the Linear Regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions using the test data
y_pred = model.predict(X_test)

# Calculate performance metrics
r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)

# Save the trained model as a .pkl file
MODEL_PATH = os.path.join(".", "model_ecommerce_shop.pkl")
dump(model, MODEL_PATH)

# Create a dictionary to store evaluation results
results = {
    "dataset": "ecommerce_shop",
    "model": "LinearRegression",
    "r2_score": r2,
    "mae": mae,
    "features_used": ['CTR', 'CPC'],
    "timestamp": datetime.now().isoformat()
}

# Save the results locally to a JSON file
with open("results.json", "w") as f:
    json.dump(results, f, indent=4)

# Log the experiment results to the MongoDB database
log_experiment_result("ecommerce_shop", "LinearRegression", {"r2_score": r2, "mae": mae})

# Print confirmation of experiment completion
print("E-commerce experiment complete. Results saved and logged to MongoDB.")