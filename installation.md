# Installation & Usage Guide

## 1) Requirements

- Python 3.9+
- Node.js 18+ and npm
- (Optional) MongoDB for persistence

## 2) Clone repository

```bash
git clone https://github.com/gaswiz/pythia-core.git
cd pythia-core
```

## 3) Backend setup

### Create environment and install dependencies

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

### Run backend API

```bash
python3 -m backend.app
```

### Backend check

```bash
curl http://127.0.0.1:5000/health
```

Expected response fields include model availability and Mongo connectivity state.

## 4) Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend default URL is usually `http://localhost:5173`.

## 5) Environment variables

Create `backend/.env` (optional values are supported):

```env
PORT=5000
FLASK_DEBUG=0
MONGO_URI=
DATABASE_NAME=pythia
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
SHAP_BACKGROUND_SAMPLE_SIZE=100
```

## 6) API quick checks

### Predict

```bash
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"Acquisition_Cost":12496,"Impressions":5517,"Clicks":550,"Conversion_Rate":0.08,"Duration":30}'
```

### Upload

```bash
curl -X POST http://127.0.0.1:5000/upload \
  -F "file=@data/marketing_campaign_dataset.csv"
```

### Recommend

```bash
curl -X GET "http://127.0.0.1:5000/recommend?budget=5000"
```

### Health

```bash
curl http://127.0.0.1:5000/health
```

## 7) Troubleshooting

- **No module found:** ensure virtual environment is active.
- **Port mismatch:** backend default is `5000` and frontend default is `5173`.
- **Mongo errors:** keep `MONGO_URI` empty for local no-db mode.
- **Upload fails:** ensure file is `.csv` and readable.

## 8) Documentation map

- [backend.md](./backend.md)
- [frontend.md](./frontend.md)
- [README.md](./README.md)
