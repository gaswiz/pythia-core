# Frontend Documentation — P.Y.T.H.I.A.

## Overview

The frontend is a React + Vite application that functions as a technical demo surface for campaign inference workflows. It is designed to show the backend contract, model outputs, and result interpretation in one coherent product-style layout.

## Stack

- **Framework:** React 19
- **Bundler/dev server:** Vite
- **Charting:** Recharts
- **Animation:** Framer Motion
- **Icons:** Tabler Icons React

## Responsibilities

- Collect campaign parameters through scenario controls and form inputs.
- Send prediction requests to Flask backend (`/predict`).
- Display API payload and response with readable sections.
- Render inference visuals (forecast and influence charts) and scenario summaries.
- Surface fallback behavior when backend is unavailable.

## File Map

```text
frontend/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.jsx          # Main single-page application container
│   ├── main.jsx         # Vite entrypoint
│   ├── demoData.js      # Scenario data, feature metadata, static experiment summaries
│   ├── index.css        # Shared visual system + global styles
│   └── components/      # Reusable utility UI components
└── public/              # Media assets used in hero and docs
```

## Frontend Modes

### API mode

- Active when `http://127.0.0.1:5000/predict` responds successfully.
- Uses live payload from scenario/form and renders server response.
- Uses the same feature names as backend contract.

### Demo mode

- Triggered automatically when backend call fails.
- Uses local deterministic inference logic with identical payload shape.
- Keeps UI behavior unchanged for portfolio review and offline inspection.

## Charting and Result Panels

The interface uses Recharts for:

- forecast/pacing curves,
- feature influence bars (from SHAP payload when present),
- scenario and experiment-level comparisons.

All chart containers are intentionally large and top-level sections are kept to structured, non-fragmented panels to preserve readability.

## API and Contract Alignment

### Expected JSON contract

Backend request fields:

```json
{
  "Acquisition_Cost": 12496,
  "Impressions": 5517,
  "Clicks": 550,
  "Conversion_Rate": 0.08,
  "Duration": 30
}
```

Expected response fields:

```json
{
  "ROI_Category": 1,
  "Estimated_Clicks": 1200,
  "SHAP_Explanation": {
    "Acquisition_Cost": 0.01
  }
}
```

### Response handling

- Missing or invalid responses are shown with graceful fallback.
- Prediction output cards are updated from the response payload and derived fields.

## Local Demo Run

```bash
cd frontend
npm install
npm run dev
```

Open local URL shown by Vite (typically `http://localhost:5173`).

## Navigation and Sectioning

- Top navigation: Overview → Demo → Model Insights → Documentation
- Reusable section wrappers provide consistent spacing and visual rhythm.

## Notes for Contributors

When modifying layout or chart behavior:

- preserve payload labels and field names,
- keep backend/developer fallback behavior intact,
- avoid changing demo logic unless coordinated with API contract changes.
