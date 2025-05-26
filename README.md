# P.Y.T.H.I.A. — Predict Your Trends, Harnessing Intelligent Analytics

**P.Y.T.H.I.A.** is a machine learning–powered system for predictive analytics in digital advertising. Developed as part of an undergraduate thesis, the platform combines backend-focused machine learning pipelines with a lightweight frontend interface to simulate the forecasting of key advertising campaign metrics before campaign execution.

The system is built with Python (Flask) and React (for testing purposes) and integrates statistical regression techniques to estimate performance indicators such as CTR, ROI, conversions, and impressions. The emphasis is placed on accurate model predictions via structured input data and reproducible workflows.

---

## Project Scope
P.Y.T.H.I.A. is designed to assist marketing analysts, data science teams, and academic researchers by:

- Providing a framework to test and predict campaign success based on metadata
- Ingesting structured campaign data and returning performance predictions
- Supporting experimentation with various machine learning models and statistical techniques
- Offering endpoints for data upload, prediction, and recommendation

> While the frontend interface (developed in React) allows for testing and interactive demo purposes, the system's core value and logic are implemented in the backend. The backend implementation and data science logic will be documented in detail in a separate `backend.md` file.

---

## Key Capabilities
- Campaign data upload via API or form
- Forecasting with Linear and Poisson regression models
- Metrics generated include: CTR, Clicks, Impressions, CPC, ROI
- Backend API with endpoints for upload (`/upload`), prediction (`/predict`), and recommendations (`/recommend`)
- Basic file-based logging and MongoDB support (optional)
- CLI and API-compatible operation
- Frontend (React) to demonstrate flow and test UI logic (optional, non-essential)

---

## Installation Guide
Refer to the dedicated [`installation.md`](./installation.md) file for:
- Backend and Python environment setup
- Virtual environment and dependency installation
- Running the Flask API
- Optional frontend setup for development and testing

---

## Repository Structure (Simplified Overview)

```
PYTHIA/
├── backend/
│   ├── app.py                         # Flask backend application
│   ├── model_training.py             # Training logic for ML models
│   ├── data_cleaning.py              # Preprocessing scripts
│   ├── recommend_engine.py           # Campaign similarity logic
│   ├── export_results.py             # Export to CSV / DB
│   └── utils/                        # Support files, SHAP, logging
│
├── data/
│   └── marketing_campaign_dataset.csv  # Core dataset (used by backend)
│
├── frontend/ (for demo/testing)
│   └── src/components/               # React components
│       ├── FileUploader.jsx
│       ├── DashboardSelector.jsx
│       ├── ...
│
├── public/                           # Static files if any
│
├── README.md                         # You are here
├── installation.md                   # Setup and dependencies
├── frontend.md                       # UI design and testing logic
├── backend.md                        # Backend prediction API design
└── .gitignore
```

---

## Technologies Used

| Layer      | Stack                                  |
|------------|-----------------------------------------|
| Backend    | Python, Flask, pandas, scikit-learn     |
| ML Models  | Linear Regression, Poisson Regression   |
| Frontend   | React (for local testing only)          |
| Data I/O   | CSV file uploads, REST API              |
| Tooling    | Postman (planned), SHAP (explanations)  |
| Themes     | Light/Dark toggle with CSS variables     |

---

## Academic Context
- **University**: University of East London  
- **Program**: BSc Computer Science  
- **Module**: Final-Year Project / Thesis  
- **Student**: Konstantinos Panagiotaropoulos  
- **Timeline**: January – May 2025  
- **Title**: P.Y.T.H.I.A. — Predict Your Trends, Harnessing Intelligent Analytics

---

## Roadmap
- Add complete Postman API demo collection
- Integrate evaluation metrics (MAE, RMSE)
- Support time-series prediction for extended planning
- Incorporate alternative models (e.g., decision trees)
- Export predictions for Looker Studio integration

---

## License
This project is intended strictly for academic and non-commercial research use. All source code and models were developed independently as part of an academic thesis.

---

Further details are provided in the [`backend.md`](./backend.md) and [`frontend.md`](./frontend.md) documents.
