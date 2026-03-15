import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
REPO_ROOT = BASE_DIR.parent
MODELS_DIR = REPO_ROOT / "models"
DATA_DIR = REPO_ROOT / "data"

PORT = int(os.getenv("PORT", "5000"))
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"

MONGO_URI = os.getenv("MONGO_URI", "").strip()
DATABASE_NAME = os.getenv("DATABASE_NAME", "pythia")

# Allow comma-separated dev origins. Defaults are safe for local Vite development.
FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]

MODEL_FEATURES = [
    "Acquisition_Cost",
    "Impressions",
    "Clicks",
    "Conversion_Rate",
    "Duration",
]

LOGISTIC_MODEL_PATH = MODELS_DIR / "logistic_roi_model.pkl"
POISSON_MODEL_PATH = MODELS_DIR / "poisson_click_model.pkl"
FALLBACK_DATA_PATH = DATA_DIR / "marketing_campaign_dataset.csv"

SHAP_BACKGROUND_SAMPLE_SIZE = int(os.getenv("SHAP_BACKGROUND_SAMPLE_SIZE", "100"))
