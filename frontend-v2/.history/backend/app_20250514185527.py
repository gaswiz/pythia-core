# backend/app.py

from flask import Flask
from flask_cors import CORS
from routes.upload_routes import upload_bp
from routes.predict_routes import predict_bp
from routes.recommend_routes import recommend_bp
from utils.db import connect_to_mongo
import joblib
import shap

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Connect to MongoDB
db = connect_to_mongo()
app.config['MONGO_DB'] = db

# Load trained models from /models
cls_model = joblib.load('models/logistic_roi_model.pkl')
reg_model = joblib.load('models/poisson_clicks_model.pkl')

# SHAP Explainers (based on Linear Models)
shap_explainer = shap.Explainer(cls_model)

# Make models and explainers globally available
app.config['CLS_MODEL'] = cls_model
app.config['REG_MODEL'] = reg_model
app.config['SHAP_EXPLAINER'] = shap_explainer

# Register route blueprints
app.register_blueprint(upload_bp, url_prefix='/upload')
app.register_blueprint(predict_bp, url_prefix='/predict')
app.register_blueprint(recommend_bp, url_prefix='/recommend')

# Entry point
if __name__ == '__main__':
    app.run(debug=True)
