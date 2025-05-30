import os
import certifi
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient

# Load .env
load_dotenv()

# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client["pythia"]

# Load the fixed CSV
df = pd.read_csv("fixed_campaigns.csv")

# Check columns before inserting
expected_columns = ["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"]
if not all(col in df.columns for col in expected_columns):
    print("❌ CSV columns don't match expected features.")
    print("Found columns:", df.columns.tolist())
    exit(1)

# Wipe and insert
db["clean_campaigns"].delete_many({})
db["clean_campaigns"].insert_many(df.to_dict(orient="records"))

print(f"✅ Inserted {len(df)} rows into clean_campaigns.")
