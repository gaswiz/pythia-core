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

# Ensure all features are numeric
df["Acquisition_Cost"] = pd.to_numeric(df["Acquisition_Cost"], errors="coerce")
df["Impressions"] = pd.to_numeric(df["Impressions"], errors="coerce")
df["Clicks"] = pd.to_numeric(df["Clicks"], errors="coerce")
df["Conversion_Rate"] = pd.to_numeric(df["Conversion_Rate"], errors="coerce")
df["Duration"] = pd.to_numeric(df["Duration"], errors="coerce")

df = df.dropna(subset=["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"])

# Re-insert clean numeric data
db["clean_campaigns"].delete_many({})
db["clean_campaigns"].insert_many(df.to_dict(orient="records"))

print(f"✅ Re-uploaded {len(df)} rows with correct numeric types.")
