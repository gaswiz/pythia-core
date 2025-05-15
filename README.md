# P.Y.T.H.I.A. — Predict Your Trends, Harnessing Intelligent Analytics

P.Y.T.H.I.A. is a machine learning–powered platform for predictive analytics in digital advertising. Designed as a university-level thesis project, the system provides campaign outcome forecasting prior to execution using structured metadata and regression models. It includes a full-stack implementation combining React, Flask, and scikit-learn.

---

## Project Purpose

The system aims to provide marketing analysts and data teams with a tool to predict the success of advertising campaigns before launch. Using campaign metadata such as impressions, budget, and industry sector, P.Y.T.H.I.A. offers a framework for:

- Forecasting click-through rate (CTR), ROI, and conversions
- Generating post-upload insights and recommendations
- Automating performance modeling using clean APIs

---

## Key Features

- Structured dataset ingestion via web interface
- Upload endpoint for campaign data (.csv)
- Prediction endpoint returning ML-generated performance metrics
- Data visualisation and light/dark mode toggle
- Animated UI with modular components
- Recommendation engine for campaign optimisation
- Expandable FAQ interface with planned support for code blocks and Postman demonstrations

---

## System Architecture

### 1. Frontend (React)

- `/components/` includes modular UI components:
  - `Hero.jsx`, `MenuBar.jsx`, `FileUploader.jsx`, `PredictionTool.jsx`
  - `RecommendationTool.jsx`, `Dashboard.jsx`, `Footer.jsx`, `ThemeToggle.jsx`
- `Faq.jsx` (planned): Expanding questions about API/architecture
- Dark/light theme via CSS variables and `ThemeToggle`

### 2. Backend (Flask, Python)

- `/scripts/` contains:
  - `data_cleaning.py`: Preprocessing logic
  - `model_training.py`: Regression model construction and scoring
  - `recommend_engine.py`: Simple similarity-based recommendations
  - `export_results.py`: CSV/database output logic
- `/api/` or `app.py` (planned): Flask route handlers for `/upload` and `/predict`

---

## End-to-End Flow

1. **User uploads a campaign dataset** (CSV) via `FileUploader`
2. **Backend parses and validates data** using `data_cleaning.py`
3. **Model prediction runs** using `model_training.py`
   - Uses linear and Poisson regression
   - Returns expected CTR, conversions, etc.
4. **Frontend renders results** in `PredictionTool` and `Dashboard`
5. **Recommendations generated** (via `recommend_engine.py`) based on campaign similarity

---

## Example Directory Structure

```

PYTHIA/
├── frontend/
│   └── src/components/
│       ├── App.jsx
│       ├── FileUploader.jsx
│       ├── PredictionTool.jsx
│       ├── RecommendationTool.jsx
│       ├── Dashboard.jsx
│       ├── ThemeToggle.jsx
│       ├── Footer.jsx
│       ├── MenuBar.jsx
│       └── Faq.jsx (planned)
│   ├── index.css
│   └── main.jsx
├── scripts/
│   ├── model\_training.py
│   ├── data\_cleaning.py
│   ├── recommend\_engine.py
│   └── export\_results.py
├── README.md
├── .gitignore

```

---

## Technologies Used

| Layer      | Stack                                      |
|------------|---------------------------------------------|
| Frontend   | React, JSX, CSS Modules, Framer Motion      |
| Backend    | Python, Flask, pandas, scikit-learn         |
| ML Models  | Linear Regression, Poisson Regression       |
| Data I/O   | CSV, File uploads, REST                     |
| API Tools  | Postman (planned for endpoint validation)   |
| Theme UX   | Dark/Light Mode with CSS variables          |

---

## Academic Context

- **Institution**: University of East London  
- **Programme**: BSc Computer Science  
- **Module**: Final-Year Thesis  
- **Student**: Konstantinos Panagiotaropoulos  
- **Timeline**: January – May 2025  
- **Title**: P.Y.T.H.I.A. — Predict Your Trends, Harnessing Intelligent Analytics  

---

## Roadmap

- [ ] Add Postman collection with example API requests
- [ ] Model evaluation metrics (MAE, RMSE)
- [ ] Time-series prediction for multi-week campaign planning
- [ ] Support for decision trees or ensemble methods
- [ ] CSV export of predictions + Looker Studio compatibility

---

## License

This repository is intended for academic and non-commercial research use. All code and models are original and developed as part of a university thesis project.

