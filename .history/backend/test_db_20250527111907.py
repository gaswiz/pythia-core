import os
import certifi
from dotenv import load_dotenv
from pymongo import MongoClient
import pandas as pd

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client["pythia"]

df_bg = pd.DataFrame(list(db["clean_campaigns"].find()))
print(df_bg.head())
print(df_bg.columns)
