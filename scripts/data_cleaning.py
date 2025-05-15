"""
P.Y.T.H.I.A. - Phase 1: Dataset Cleaning and Feature Engineering
---------------------------------------------------------------
This script loads the marketing_campaign_dataset.csv file,
cleans it, derives new features, and stores the clean version in MongoDB.
"""

import os
import pandas as pd
from pymongo import MongoClient

# ------------------- CONFIG ------------------- #
# MongoDB connection (local, default port)
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "pythia"
COLLECTION_NAME = "clean_campaigns"

# Dataset path (relative to project root)
project_root = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(project_root, "..", "data", "marketing_campaign_dataset.csv")

# ------------------- LOAD DATA ------------------- #
print("Loading dataset...")
df = pd.read_csv(data_path)
print("Columns in the dataset:", df.columns.tolist())

# ------------------- CLEANING ------------------- #
print("Cleaning fields...")
# Remove currency symbols and commas where applicable
if "Acquisition_Cost" in df.columns:
    df["Acquisition_Cost"] = df["Acquisition_Cost"].replace(r"[\$,]", "", regex=True).astype(float)

# Convert duration to integer (e.g., '30 days' → 30)
if "Duration" in df.columns:
    df["Duration"] = df["Duration"].astype(str).str.extract(r"(\d+)").astype(float)

# Parse date fields
for date_col in ["Start_Date", "End_Date"]:
    if date_col in df.columns:
        df[date_col] = pd.to_datetime(df[date_col], errors="coerce")

# Drop rows with critical missing values
critical_fields = [col for col in ["Impressions", "Conversion_Rate", "Clicks", "Acquisition_Cost", "Duration"] if col in df.columns]
df.dropna(subset=critical_fields, inplace=True)

# ------------------- DERIVED FEATURES ------------------- #
print("Generating derived features...")
if all(col in df.columns for col in ["Acquisition_Cost", "Clicks"]):
    df["Cost_Per_Click"] = df["Acquisition_Cost"] / df["Clicks"]

if all(col in df.columns for col in ["Impressions", "Duration"]):
    df["Impressions_Per_Day"] = df["Impressions"] / df["Duration"]

if all(col in df.columns for col in ["Revenue", "Acquisition_Cost"]):
    df["ROI"] = (df["Revenue"] - df["Acquisition_Cost"]) / df["Acquisition_Cost"]

# ------------------- SAVE TO MONGO ------------------- #
print("Connecting to MongoDB and inserting cleaned data...")
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# Convert DataFrame to dictionary format for MongoDB
records = df.to_dict(orient="records")
collection.delete_many({})  # Clean slate
collection.insert_many(records)

print(f"Inserted {len(records)} documents into '{COLLECTION_NAME}' collection.")
