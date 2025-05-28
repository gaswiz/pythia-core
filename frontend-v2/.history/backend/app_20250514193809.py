"""
P.Y.T.H.I.A. - Phase 4: Flask Backend API
----------------------------------------
Serves predictions, recommendations, and data upload via RESTful routes.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import shap
import os
from pymongo import MongoClient

# ------------------- CONFIG ------------------- #
app = Flask(__name__)
CORS(app)

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "pythia"
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "models")
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# ------------------- LOAD MODELS ------------------- #
cls_model = joblib.load(os.path.join(MODEL_DIR, "logistic_roi_model.pkl"))
reg_model = joblib.load(os.path.join(MODEL_DIR, "poisson_click_model.pkl"))

 Sample background data from Mongo
df_bg = pd.DataFrame(list(db["clean_campaigns"].find()))
features = ["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"]
X_background = df_bg[features].dropna().sample(n=min(100, len(df_bg)), random_state=1)

explainer = shap.Explainer(cls_model.predict_proba, shap.maskers.Independent(data=X_background))


# ------------------- ROUTES ------------------- #
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        X = pd.DataFrame([data])[features]

        roi_class = int(cls_model.predict(X)[0])
        clicks_pred = float(reg_model.predict(X)[0])
        shap_values = explainer(X)
        shap_summary = dict(zip(features, shap_values.values[0].tolist()))

        response = {
            "ROI_Category": roi_class,
            "Estimated_Clicks": round(clicks_pred),
            "SHAP_Explanation": shap_summary
        }

        db["predictions_logs"].insert_one({"input": data, "output": response})
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/recommend", methods=["GET"])
def recommend():
    try:
        budget = float(request.args.get("budget"))
        record = db["recommendations"].find_one({"input_budget": int(budget)})
        if record:
            return jsonify(record["recommendation"])
        else:
            return jsonify({"message": "No recommendation available for this budget."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/upload", methods=["POST"])
def upload():
    try:
        file = request.files['file']
        df = pd.read_csv(file)
        df.to_dict(orient="records")
        db["clean_campaigns"].delete_many({})
        db["clean_campaigns"].insert_many(df.to_dict(orient="records"))
        return jsonify({"message": "File uploaded and data stored."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ------------------- MAIN ------------------- #
if __name__ == '__main__':
    app.run(debug=True)
