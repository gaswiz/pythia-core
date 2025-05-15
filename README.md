# P.Y.T.H.I.A. — Predict Your Trends, Harnessing Intelligent Analytics

P.Y.T.H.I.A. is a machine learning–based platform for predictive analytics in digital advertising. Developed as a final-year Computer Science thesis, the system enables pre-launch forecasting of campaign performance using structured metadata and statistical learning models.

---

## Overview

The goal of P.Y.T.H.I.A. is to support media buyers and marketing analysts in predicting the effectiveness of digital advertising campaigns before deployment. By analysing campaign metadata (e.g. budget, impressions, industry sector, channel), the system builds regression models that estimate expected outcomes such as CTR, conversions, or cost efficiency.

This project demonstrates the feasibility of using classical machine learning techniques to forecast ad performance in a reproducible, API-driven workflow.

---

## Features

- Forecasts campaign performance metrics based on historical metadata
- Linear and Poisson regression modeling using scikit-learn and pandas
- API endpoints for uploading datasets and generating predictions
- Frontend integration with theme-aware UI (light/dark mode)
- Modular directory structure supporting future ML model expansion
- Prepares foundation for integration with Postman test collections and visualisation tools

---

## Technology Stack

### Machine Learning and Data Processing

- Python 3.x
- pandas, NumPy
- scikit-learn
- statsmodels (planned)
- Matplotlib / Seaborn (for visualisation)

### Backend (API)

- Flask
- Flask-CORS
- PostgreSQL (via SQLAlchemy or raw queries)
- File upload handling (CSV)
- REST endpoints: `/upload`, `/predict`

### Frontend

- React (Vite)
- Framer Motion for animations
- Theme toggle (CSS variables for dark/light mode)
- Modular UI components: Hero, Uploader, PredictionTool, Dashboard, FAQ

---

## Directory Structure (Frontend)

```

/frontend
├── /components
│   ├── Hero.jsx
│   ├── MenuBar.jsx
│   ├── FileUploader.jsx
│   ├── PredictionTool.jsx
│   ├── RecommendationTool.jsx
│   ├── Dashboard.jsx
│   ├── Faq.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
├── index.css
└── ...

```

---

## Roadmap

The following features are planned for future releases:

- Time-series forecasting for budget allocation over campaign lifecycle
- Support for decision trees or XGBoost-based models
- Secure token-based authentication for API endpoints
- Full Postman test collection for public API simulation
- CLI utilities for local batch predictions
- Data export to BI tools like Looker Studio

---

## Academic Context

- **Institution**: University of East London  
- **Course**: Final-Year Computer Science Thesis  
- **Project Title**: Predictive Analytics for Digital Marketing Using Machine Learning  
- **Technologies**: Python, React, Flask, PostgreSQL  
- **Duration**: January 2025 – May 2025  

---

## License

This repository is private and maintained for academic and research use only. Redistribution without permission is prohibited.


