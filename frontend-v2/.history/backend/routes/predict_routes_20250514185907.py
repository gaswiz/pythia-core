# backend/routes/predict_routes.py

from flask import Blueprint, request, jsonify
from backend.controllers.predict_controller import predict_campaign

predict_bp = Blueprint('predict_bp', __name__)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    result = predict_campaign(data)
    return jsonify(result)
