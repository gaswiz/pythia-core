# Backend Architecture — P.Y.T.H.I.A.

## Overview

The backend is a Flask API responsible for prediction, upload, and recommendation workflows. It is intentionally thin at the transport layer and explicit about input/output contracts for the frontend and API clients.

Core modules:

- `backend.app` runtime server and route handlers
- `backend.config` runtime settings and model/data paths
- `backend.utils.db` optional MongoDB connector (degrades gracefully when unavailable)
- script utilities under `scripts/` for training and preprocessing support

## System Flow

```text
Client -> Flask app -> request validation -> model loading -> output + optional persistence -> response
```

The API supports:

- direct JSON inference with numeric feature payloads,
- CSV upload for campaign history refresh,
- recommendation lookup from uploaded/background data.

## Runtime Components

### `backend/app.py`

Defines these endpoints:

- `GET /health`  
  Returns service health, MongoDB connectivity state, and model artifact presence.
- `POST /predict`  
  Runs validation + inference and returns ROI class and click estimate.
- `GET /recommend`  
  Resolves a recommendation from campaign history for `budget` query param.
- `POST /upload`  
  Accepts a CSV file and updates the in-memory/background campaign frame.

### Model loading and runtime behavior

- Model paths are read from `backend.config`:
  - `LOGISTIC_MODEL_PATH` → `models/logistic_roi_model.pkl`
  - `POISSON_MODEL_PATH` → `models/poisson_click_model.pkl`
- Models and SHAP explainer are lazily loaded and cached where practical.
- If model files are missing, `/predict` returns `500` with a clear error.

### Database integration

Persistence is optional and controlled by `MONGO_URI`.

- If `MONGO_URI` is set and reachable, predictions, recommendations, and uploads are stored in MongoDB collections.
- If not configured, API behavior remains functional with fallback paths (in-memory/background frame only).

## ML Pipeline

### Prediction flow

1. Validate payload contains:
   - `Acquisition_Cost`
   - `Impressions`
   - `Clicks`
   - `Conversion_Rate`
   - `Duration`
2. Coerce each field to numeric format.
3. Execute:
   - logistic model on the feature vector → `ROI_Category`,
   - Poisson model on the same feature vector → `Estimated_Clicks`.
4. Optionally compute SHAP values if SHAP and background data are available.
5. Return JSON response and persist optional logs.

### Dataset handling

- Primary fallback source is `data/marketing_campaign_dataset.csv`.
- `POST /upload` requires a CSV file.
- Uploaded data is normalized to required model feature columns:
  - missing columns are added with zero values,
  - non-convertible values are dropped,
  - data is kept numeric before inference use.

### Feature preprocessing

- Feature enforcement is central and strict by schema.
- Normalization ensures only expected model features are used by inference.
- Missing required fields return a 400 validation error with explicit names.

### Recommendation flow (`/recommend`)

- Query parameter: `budget` (required).
- Recommendation search applies a ±20% budget window over the available background frame.
- If no candidate exists, a 404 response is returned with a descriptive message.

## API Contract Reference

### `POST /predict` request body

| Field | Type | Required | Description |
|---|---|---|---|
| `Acquisition_Cost` | number | yes | Campaign spend assumption |
| `Impressions` | number | yes | Campaign reach estimate |
| `Clicks` | number | yes | Prior clicks reference |
| `Conversion_Rate` | number | yes | Conversion ratio |
| `Duration` | number | yes | Campaign duration |

### `POST /predict` response

| Field | Type | Meaning |
|---|---|---|
| `ROI_Category` | integer | Binary ROI direction class |
| `Estimated_Clicks` | number | Poisson model forecast |
| `SHAP_Explanation` | object | optional feature influence values |

### `POST /upload`

- multipart/form-data with key `file`.
- accepts CSV only.
- response includes row count and persistence status.

### `GET /recommend?budget=<amount>`

- `budget`: numeric query parameter.
- response includes recommended duration, expected clicks, and expected conversion rate.

## Logging and Observability

Structured responses from:

- `/health` for runtime check and status.
- `prediction` and `recommendation` routes for API-level diagnostics and graceful fallback behavior.

## External References

- Frontend integration details: [frontend.md](./frontend.md)
- Setup steps: [installation.md](./installation.md)
