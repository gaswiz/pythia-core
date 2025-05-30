import os
import certifi
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client["pythia"]

df = pd.read_csv("fixed_campaigns.csv")

# Enforce correct types
for col in ["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"]:
    df[col] = pd.to_numeric(df[col], errors="coerce")

original_count = len(df)

# Drop rows with invalid values
df = df.dropna(subset=["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"])
cleaned_count = len(df)

print(f"✅ Cleaned dataset: {cleaned_count} rows remain (dropped {original_count - cleaned_count})")

if cleaned_count > 0:
    db["clean_campaigns"].delete_many({})
    db["clean_campaigns"].insert_many(df.to_dict(orient="records"))
    print(f"✅ Re-uploaded {cleaned_count} clean rows into MongoDB.")
else:
    print("❌ No valid rows found. Please check your CSV content.")
