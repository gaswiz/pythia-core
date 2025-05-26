# Frontend Overview — P.Y.T.H.I.A.

This document describes the role and implementation of the frontend interface in the P.Y.T.H.I.A. system. While the core logic of the platform resides in the backend, the frontend exists to offer a lightweight UI for testing and demonstration purposes.

---

## Purpose of the Frontend

The frontend does not represent a complete production interface. It serves as a **test and visual demonstration layer** to:
- Allow file uploads for campaign datasets
- Trigger model predictions via a form
- Visualise outputs from the backend (e.g., ROI category, clicks, SHAP explanation)
- Test response latency and behavior of API endpoints

Currently, the interface is partially implemented, incomplete in some areas, and does **not** yet reflect the advanced dashboard logic described in the roadmap.

---

## Key Technologies

- **React**: Core component system (no state manager used)
- **Vite**: Development server and bundler
- **CSS (via modules)**: Basic styling and dark mode
- **Axios or fetch**: To call Flask backend endpoints

---

## Current Components and Functionality

| Component               | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `App.jsx`              | Main entry point — mounts all sections and routes                           |
| `Hero.jsx`             | Static top banner and description                                           |
| `MenuBar.jsx`          | Simple top navigation placeholder                                           |
| `FileUploader.jsx`     | Allows users to select and upload a CSV file to the `/upload` API endpoint  |
| `PredictionTool.jsx`   | Accepts manual form input for campaign features, submits to `/predict`      |
| `RecommendationTool.jsx` | Submits a test budget to `/recommend` and displays the backend’s suggestion |
| `Footer.jsx`           | Layout placeholder (static)                                                 |
| `ThemeToggle.jsx`      | Enables toggling between dark and light themes                              |

---

## Current Limitations

- The dynamic **dashboard selector UI** has not yet been implemented
- Component states are handled with minimal hooks
- No global context or router is used
- Form input options are not auto-filled based on the actual dataset values
- Output is shown directly with basic HTML; no charts or animations are present

---

## Setup Instructions

From the root of the repository:

```bash
cd frontend
npm install
npm run dev
```

Then visit:
```
http://localhost:5173
```

Ensure the Flask backend is running on `localhost:5000` in parallel to handle form submissions.

---

## API Communication

Each form in the frontend connects to a backend route:
- `POST /upload` → FileUploader
- `POST /predict` → PredictionTool
- `GET /recommend?budget=XXXX` → RecommendationTool

These requests are made with standard `fetch()` calls.

---

## Future Development (Planned in Roadmap)

- Build a complete **DashboardSelector.jsx** with:
  - Dynamic input fields populated from backend metadata
  - Animated step-by-step UX for campaign creation
  - Integrated SHAP explanations and performance graphs
- Fully redesign all static components into dynamic UI modules
- Incorporate routing and persistent state across component flows
- Include Postman test panel, code snippets, and inline API documentation

---

## Summary
The current frontend is a placeholder layer designed to simulate workflow interaction with the machine learning backend. It can be used for local testing and proof of concept but does not represent a final user interface.

Refer to [`backend.md`](./backend.md) to understand the models, API structure, and logic that powers this interface.
