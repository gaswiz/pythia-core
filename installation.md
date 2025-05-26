# Installation & Usage Guide for P.Y.T.H.I.A.

This document outlines how to properly clone, install, and run the P.Y.T.H.I.A. system — a machine learning–powered predictive analytics platform built for academic and experimental use. It includes instructions for both the backend (Flask, ML logic) and frontend (React-based demo interface).

---

## 1. Clone the Repository

```bash
git clone https://github.com/gaswiz/pythia-core.git
cd pythia-core
```

---

## 2. Frontend Setup (for testing/demo purposes)

The frontend is optional and serves as a visual UI for API interactions.

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
cd frontend
npm install
```

### Run the dev server
```bash
npm run dev
```

### What to Expect
- The app will start on `http://localhost:5173`
- You should see the hero section, upload form, and dashboard selector interface
- Buttons allow you to simulate campaign selection and fetch predictions from the backend

---

## 3. Backend Setup (core logic)

The backend drives the prediction models and API endpoints.

### Prerequisites
- Python 3.9+
- Recommended: use a virtual environment

### Environment setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

> If `requirements.txt` is missing, install manually:
```bash
pip install flask pandas scikit-learn shap matplotlib
```

### Launch the API server
```bash
python3 app.py
```

### What to Expect
- The API will be available at `http://localhost:5000`
- Main endpoints:
  - `POST /upload`: accepts a CSV file with campaign metadata
  - `POST /predict`: receives JSON input and returns forecasted metrics
  - `GET /recommend?budget=5000`: returns a budget-based recommendation

---

## 4. Core Backend Files

| File | Purpose |
|------|---------|
| `app.py` | Main Flask API with all route logic |
| `data_cleaning.py` | Cleans uploaded CSV input before predictions |
| `model_training.py` | Builds and scores ML regression models |
| `recommend_engine.py` | Suggests optimised budget or duration |
| `export_results.py` | Exports structured results to disk or MongoDB |

---

## 5. Exploratory Data Analysis (EDA)

The file `eda.ipynb` provides:
- Overview of the dataset used
- Distribution of core features (e.g., impressions, budget)
- Insights into preprocessing and outlier handling
- Recommended viewing before modifying ML logic

To open:
```bash
jupyter notebook eda.ipynb
```

---

## 6. Running Experimental Campaign Models

P.Y.T.H.I.A. includes several ML experiments under `/experiments/`. These test different datasets and model strategies.

### Run all experiments:
```bash
cd experiments
python3 run_all_experiments.py
```

> If errors occur about missing files like `Advertising_dataset_with_character_target.csv` or `final_shop_6modata.csv`, ensure `/data/` contains the required datasets.

### Run individual experiments:
```bash
cd experiments/advertising_standard
python3 run_experiment.py
```

### Generate a comparison summary:
```bash
cd ../
python3 generate_summary.py
```
- Produces: `experiment_summary.json`

### Plot result comparisons:
```bash
python3 plot_comparisons.py
```
- Output: `comparison_r2_scores.png`, `comparison_mae_scores.png`

---

## Troubleshooting

- If `matplotlib` is missing:
```bash
pip install matplotlib
```

- If using macOS and certain scripts aren't on your `$PATH`, add this line to your shell profile:
```bash
export PATH="$HOME/Library/Python/3.9/bin:$PATH"
```

---

## Next Steps
Refer to the following guides:
- [`backend.md`](./backend.md) — Detailed model and route documentation
- [`frontend.md`](./frontend.md) — UI logic and testing layer

For academic use only. Created as part of a final-year thesis at the University of East London.
