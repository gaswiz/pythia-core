# Backend Overview — P.Y.T.H.I.A.

This document describes the backend architecture and logic of **P.Y.T.H.I.A.**, the predictive analytics engine. While a frontend is available for testing purposes, the core system functionality is developed and maintained in the backend.

---

## Core Concepts
The backend is implemented in Python and built around:
- **Flask**: for serving predictions, recommendations, and handling uploads
- **MongoDB**: for storing cleaned data, logs, performance metrics, and model output
- **scikit-learn**: for training and evaluating regression models
- **SHAP**: for explainability of predictions

Some important utility scripts and modules related to backend logic are intentionally located **outside the backend folder**. This was done to allow reuse from both backend and frontend parts of the project without path conflicts.

---

## Key Backend Files and What They Do

### `app.py`
- Serves as the main Flask application.
- Handles the following endpoints:
  - `POST /upload`: accepts a CSV file and stores cleaned records into MongoDB
  - `POST /predict`: performs prediction based on input metadata using two trained models
  - `GET /recommend`: returns a data-driven recommendation based on a given budget
  - `GET /api/dataset/options`: extracts unique values from the dataset for use in the UI
- Loads pre-trained models from disk and prepares background data for SHAP explanations.

### `data_cleaning.py`
- Prepares campaign datasets for training and prediction.
- Converts fields, removes bad rows, computes derived features (e.g. CPC, ROI)
- Uploads cleaned records to MongoDB collection `clean_campaigns`
- Called prior to model training or batch uploads

### `model_training.py`
- Trains two models:
  - **Logistic Regression**: classifies campaigns into ROI-positive or ROI-negative
  - **Poisson Regression**: predicts number of clicks
- Splits data, trains and evaluates models, logs metrics (accuracy, MAE, R2)
- Exports trained models to `/models/` as `.pkl` files

### `recommend_engine.py`
- Loads trained models and generates:
  - SHAP-based explanations of feature influence
  - Recommendations for campaign duration and budget using past high-performing examples
- Saves recommendations to MongoDB

### `export_results.py`
- Extracts all predictions and recommendations from MongoDB
- Exports to JSON and CSV formats under `/exports/`
- Useful for analysis or Looker Studio integration

---

## Config and Utilities

### `config.py`
Defines:
- MongoDB URI and database name
- Collection names for various data layers

### `db.py`
Utility for initializing and returning the database instance from `config.py`

### `experiment_logger.py`
- Used for logging evaluation metrics and experiment metadata to `experiment_results` collection
- Accepts dataset name, model type, and dictionary of metrics

---

## Notes on File Structure
The following structure is used to keep the backend logic testable and integrated with other parts of the system:

- `data_cleaning.py`, `model_training.py`, `recommend_engine.py`, and `export_results.py` are not inside the `backend/` folder but remain part of the core system. This design ensures they can be used both:
  - Programmatically (from CLI, experiments, or frontend API)
  - As standalone scripts

---

## Typical Input/Output

- Input: `marketing_campaign_dataset.csv` (must include fields such as Impressions, Clicks, Acquisition_Cost, Duration)
- Output:
  - Prediction (CTR, Clicks, ROI category)
  - SHAP explanation per feature
  - Recommended duration and expected performance for a given budget

---

## SHAP and Explainability

- SHAP values are generated for every prediction
- Stored internally but can be visualized using exported plots
- A summary plot (`shap_summary_bar.png`) is generated during recommendation processing

---

## Integration with Frontend

- The backend exposes endpoints consumed by the React-based frontend
- These endpoints enable:
  - Upload of CSV files
  - Step-by-step selection of campaign parameters
  - Prediction display and recommendation fetching

---

Continue reading [`frontend.md`](./frontend.md) to understand how the frontend interacts with this API.

Ensure `models/` and `data/` directories are populated before attempting predictions.
