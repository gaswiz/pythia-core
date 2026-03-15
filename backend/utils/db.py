from pymongo import MongoClient
from pymongo.errors import PyMongoError

from backend.config import DATABASE_NAME, MONGO_URI


def get_db():
    """Return a Mongo database handle when configured and reachable."""
    if not MONGO_URI:
        return None

    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        client.admin.command("ping")
        return client[DATABASE_NAME]
    except PyMongoError:
        return None
