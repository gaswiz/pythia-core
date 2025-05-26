# backend/utils/experiment_logger.py

from backend.utils.db import get_db
from datetime import datetime

def log_experiment_result(dataset, model, metrics):
    db = get_db()
    collection = db["experiment_results"]

    entry = {
        "dataset": dataset,
        "model": model,
        "timestamp": datetime.now().isoformat(),
        **metrics
    }

    result = collection.insert_one(entry)
    return str(result.inserted_id)
