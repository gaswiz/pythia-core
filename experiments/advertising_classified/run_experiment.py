# experiments/advertising_classified/run_experiment.py

import pandas as pd
import json
import os
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from joblib import dump
from datetime import datetime
from backend.utils.experiment_logger import log_experiment_result

# Define the absolute path to the dataset
DATA_PATH = "/Users/konstantinospanagiotaropoulos/Desktop/College/Pythia/data/Advertising_dataset_with_character_target.csv"

# Load dataset from CSV
df = pd.read_csv(DATA_PATH)

# Keep only the relevant columns needed for training
columns = ['click_through_rate', 'cost_per_click', 'ROI_Category']
df = df[columns].dropna()  # Drop any rows with missing values

# Encode target column if it's a string (e.g., High/Medium/Low)
if df['ROI_Category'].dtype == 'object':
    df['ROI_Category'] = df['ROI_Category'].astype('category').cat.codes

# Define input features and target variable
X = df[['click_through_rate', 'cost_per_click']]
y = df['ROI_Category']

# Split the dataset into training and testing sets (80% / 20%)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train logistic regression model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model's accuracy and generate classification report
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred, output_dict=True)

# Save trained model as a binary .pkl file
MODEL_PATH = os.path.join(".", "model_advertising_classified.pkl")
dump(model, MODEL_PATH)

# Create a dictionary to store experiment results
results = {
    "dataset": "advertising_classified",
    "model": "LogisticRegression",
    "accuracy_score": accuracy,
    "classification_report": report,
    "features_used": ['click_through_rate', 'cost_per_click'],
    "timestamp": datetime.now().isoformat()
}

# Save the results locally as a JSON file
with open("results.json", "w") as f:
    json.dump(results, f, indent=4)

# Log the results to MongoDB database for centralized tracking
log_experiment_result("advertising_classified", "LogisticRegression", {"accuracy_score": accuracy})

# Notify user of completion
print("Classification experiment complete. Results saved and logged to MongoDB.")
