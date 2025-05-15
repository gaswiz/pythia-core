"""
P.Y.T.H.I.A. - Phase 2: Model Training and Evaluation
-----------------------------------------------------
Trains Logistic Regression (ROI classification) and Poisson Regression (Click prediction)
on the cleaned marketing campaign data from MongoDB. Saves model artifacts and logs results.
"""

import os
import pandas as pd
import joblib
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression, PoissonRegressor
from sklearn.metrics import accuracy_score, confusion_matrix, mean_absolute_error, r2_score

# ------------------- CONFIG ------------------- #
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "pythia"
COLLECTION_NAME = "clean_campaigns"
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "models")
os.makedirs(MODEL_DIR, exist_ok=True)

# ------------------- LOAD DATA ------------------- #
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]
data = list(collection.find())
df = pd.DataFrame(data)

# ------------------- PREPARE FEATURES ------------------- #
features = ["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"]
target_class = "ROI"
target_regress = "Clicks"

# Drop missing rows
df.dropna(subset=features + [target_class], inplace=True)

# Create binary ROI label
df["ROI_Category"] = (df["ROI"] > df["ROI"].median()).astype(int)

# Split data
X = df[features]
y_class = df["ROI_Category"]
y_clicks = df[target_regress]

X_train, X_test, y_train_cls, y_test_cls = train_test_split(X, y_class, test_size=0.2, random_state=42)
X_train, X_test, y_train_reg, y_test_reg = train_test_split(X, y_clicks, test_size=0.2, random_state=42)

# ------------------- TRAIN MODELS ------------------- #
print("Training Logistic Regression (ROI)...")
cls_model = LogisticRegression()
cls_model.fit(X_train, y_train_cls)
y_pred_cls = cls_model.predict(X_test)
acc = accuracy_score(y_test_cls, y_pred_cls)
conf = confusion_matrix(y_test_cls, y_pred_cls)

print("Training Poisson Regression (Clicks)...")
reg_model = PoissonRegressor()
reg_model.fit(X_train, y_train_reg)
y_pred_reg = reg_model.predict(X_test)
mae = mean_absolute_error(y_test_reg, y_pred_reg)
r2 = r2_score(y_test_reg, y_pred_reg)

# ------------------- SAVE MODELS ------------------- #
joblib.dump(cls_model, os.path.join(MODEL_DIR, "logistic_roi_model.pkl"))
joblib.dump(reg_model, os.path.join(MODEL_DIR, "poisson_click_model.pkl"))

# ------------------- LOG RESULTS ------------------- #
performance = {
    "classification": {
        "accuracy": acc,
        "confusion_matrix": conf.tolist()
    },
    "regression": {
        "mae": mae,
        "r2_score": r2
    }
}

perf_collection = db["model_performance"]
perf_collection.insert_one(performance)
print("\nModel training complete. Results logged to MongoDB.")
