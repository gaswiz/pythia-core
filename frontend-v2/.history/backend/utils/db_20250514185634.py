# backend/utils/db.py

from pymongo import MongoClient
from backend.config import MONGO_URI, DATABASE_NAME

def get_db():
    """Establish connection to MongoDB and return the database object."""
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    return db
