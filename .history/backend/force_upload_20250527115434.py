import os
import certifi
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client["pythia"]

df = pd.DataFrame(list(db["clean_campaigns"].find()))
print("Columns found in MongoDB clean_campaigns:")
print(df.columns.tolist())
print("\nFirst 3 rows:")
print(df.head(3))
