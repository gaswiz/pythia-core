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

# ✅ Clean up columns
df["Acquisition_Cost"] = df["Acquisition_Cost"].replace('[\$,]', '', regex=True).replace(',', '', regex=True).astype(float)
df["Duration"] = df["Duration"].str.replace(" days", "").astype(int)

# ✅ Confirm type conversion
for col in ["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"]:
    df[col] = pd.to_numeric(df[col], errors="coerce")

# ✅ Drop invalid rows
original_count = len(df)
df = df.dropna(subset=["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"])
cleaned_count = len(df)

print(f"✅ Cleaned: {cleaned_count} rows remain (dropped {original_count - cleaned_count})")

# ✅ Insert into MongoDB
if cleaned_count > 0:
    db["clean_campaigns"].delete_many({})
    db["clean_campaigns"].insert_many(df.to_dict(orient="records"))
    print(f"✅ Uploaded {cleaned_count} cleaned rows to MongoDB.")
else:
    print("❌ No valid rows to insert. Check CSV format.")
