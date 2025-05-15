# backend/routes/recommend_routes.py

from flask import Blueprint, request, jsonify
from backend.controllers.recommend_controller import generate_recommendation

recommend_bp = Blueprint('recommend_bp', __name__)

@recommend_bp.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input provided'}), 400

    result = generate_recommendation(data)
    return jsonify(result)
