# P.Y.T.H.I.A.

## Predict Your Trends, Harnessing Intelligent Analytics

![Python](https://img.shields.io/badge/python-3.9%2B-blue)
![Flask](https://img.shields.io/badge/backend-Flask-black)
![React](https://img.shields.io/badge/frontend-React-61DAFB)
![Vite](https://img.shields.io/badge/bundler-Vite-646CFF)
![License](https://img.shields.io/badge/license-Apache%202.0-green)
![Status](https://img.shields.io/badge/status-academic%20project-orange)
![Repo size](https://img.shields.io/github/repo-size/gaswiz/pythia-core)
![Last commit](https://img.shields.io/github/last-commit/gaswiz/pythia-core)

## Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Repository Structure](#repository-structure)
- [Installation](#installation)
- [Demo](#demo)
- [Model Information](#model-information)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Frontend](#frontend)
- [Academic Context](#academic-context)
- [Documentation Index](#documentation-index)
- [License](#license)

## Overview

P.Y.T.H.I.A. is a machine-learning project for forecasting digital campaign outcomes from structured campaign metadata. It is designed as an academic project with a production-oriented API layer:

- a Flask backend for inference and prediction experiments,
- a React + Vite frontend for interactive demos,
- persisted experiment outputs and optional MongoDB storage.

The project focuses on reproducible model inference and explicit output contracts for demos and API testing.

## Features

- Campaign prediction API with structured JSON input/output.
- Model inference with:
  - Logistic regression for ROI class prediction,
  - Poisson regression for click forecast.
- SHAP-backed explainability for prediction context.
- CSV upload path for background campaign data refresh.
- Recommendation endpoint using historical campaign windows.
- Optional MongoDB persistence for logs, recommendations, and uploads.
- Frontend demo that supports live backend inference and local fallback mode.

## System Architecture

```mermaid
flowchart LR
  U[Campaign input: JSON/CSV] --> F[Frontend (React + Vite)]
  F -->|/predict, /upload, /health| B[Flask API (backend/app.py)]
  B --> M[Model assets: models/*.pkl]
  B --> D[data/marketing_campaign_dataset.csv / uploaded CSV]
  B --> X[SHAP explainer + optional MongoDB]
  B --> R[JSON response for UI/API clients]
  R --> F
```

### Flow summary

1. UI or external client submits request to Flask.
2. Backend validates required features and numeric payload.
3. Models generate ROI class and click estimate.
4. Optional SHAP values are computed when dependencies and feature backgrounds are available.
5. Response is returned and optionally logged.

## Repository Structure

```text
pythia-core/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   └── requirements.txt
├── data/
│   ├── marketing_campaign_dataset.csv
│   ├── advertising_dataset_with_character_target.csv
│   ├── final_shop_6modata.csv
│   ├── advertisering_dataset...
│   └── ...
├── experiments/
│   ├── advertising_standard/
│   ├── advertising_classified/
│   └── ecommerce_shop/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── src/
│   └── public/
├── models/
│   ├── logistic_roi_model.pkl
│   └── poisson_click_model.pkl
├── scripts/
│   ├── data_cleaning.py
│   ├── experiment_logger.py
│   └── model_training.py
├── postman/
│   └── P.Y.T.H.I.A. - Local API.postman_collection.json
├── backend.md
├── frontend.md
├── installation.md
└── README.md
```

## Installation

Use the dedicated setup guide for full details: [installation.md](./installation.md).

### Quick start (Backend)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
python3 -m backend.app
```

### Quick start (Frontend)

```bash
cd frontend
npm install
npm run dev
```

## Demo

The frontend is built as a guided review surface for:

- loading scenario presets,
- running inference from the campaign payload,
- inspecting prediction summary values and SHAP influence,
- checking API/backend contract visibility during demos.

The demo path uses:

- `POST /predict` as the primary model call,
- `GET /health` for API status and model-file checks.

## Model Information

### Models in use

| Model | Task | Artifact |
|---|---|---|
| Logistic Regression | ROI direction classification | `models/logistic_roi_model.pkl` |
| Poisson Regression | Click count forecasting | `models/poisson_click_model.pkl` |

### Inputs

Models consume these numeric features:

- `Acquisition_Cost`
- `Impressions`
- `Clicks`
- `Conversion_Rate`
- `Duration`

### Datasets

- `data/marketing_campaign_dataset.csv` (main fallback set),
- experiment datasets in `experiments/*`,
- optional uploaded CSVs used for background/reference updates.

### Evaluation summary

Evaluation assets are stored in `experiments/` outputs. Representative metrics used in the repository include accuracy, weighted F1, R², and MAE depending on task and dataset.

## API Endpoints

### `GET /health`

Health check with runtime model file availability and Mongo status.

```bash
curl -X GET http://127.0.0.1:5000/health
```

### `POST /predict`

Inference endpoint used by the frontend and API clients.

```bash
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Acquisition_Cost": 12496,
    "Impressions": 5517,
    "Clicks": 550,
    "Conversion_Rate": 0.08,
    "Duration": 30
  }'
```

### `POST /upload`

Upload and normalize a CSV file to refresh campaign background data for recommendation and SHAP contexts.

```bash
curl -X POST http://127.0.0.1:5000/upload \
  -F "file=@data/marketing_campaign_dataset.csv"
```

### `GET /recommend`

Returns a recommendation candidate for a budget query.

```bash
curl -X GET "http://127.0.0.1:5000/recommend?budget=5000"
```

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | Optional | API port (default: `5000`) |
| `FLASK_DEBUG` | Optional | Set `1` for debug mode |
| `MONGO_URI` | Optional | MongoDB connection URI |
| `DATABASE_NAME` | Optional | Database name for optional persistence |
| `FRONTEND_ORIGINS` | Optional | Comma-separated CORS allowlist |
| `SHAP_BACKGROUND_SAMPLE_SIZE` | Optional | Controls SHAP background sampling |

## Frontend

- [backend.md](./backend.md) for server architecture, prediction flow, and dataset handling.
- [frontend.md](./frontend.md) for frontend architecture, charting, and demo mode behavior.
- [installation.md](./installation.md) for step-by-step setup.

## Academic Context

- **University:** University of East London
- **Program:** BSc Computer Science
- **Student:** Konstantinos Panagiotaropoulos
- **Scope:** Final-year project
- **Period:** Jan 2025 – May 2025

## License

This repository is documented as an Apache-2.0-style open-source project.
When publishing, include a matching `LICENSE` file and keep third-party license terms for dependencies.

This project is for academic/research use in its current repository state.
