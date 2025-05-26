# backend/routes/upload_routes.py

from flask import Blueprint, request, jsonify
from backend.controllers.upload_controller import process_upload

upload_bp = Blueprint('upload_bp', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    result = process_upload(file)
    return jsonify(result)


