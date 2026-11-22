import os
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

from database import (
    init_db,
    insert_classification,
    get_history,
    get_history_by_id,
    delete_history,
    clear_all_history,
    get_stats
)
from model import classify_image, get_model

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_FILE_SIZE_MB = 10
MAX_CONTENT_LENGTH = MAX_FILE_SIZE_MB * 1024 * 1024

def create_app(test_config=None):
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    if test_config:
        app.config.update(test_config)
        
    # Initialize DB
    with app.app_context():
        init_db(app.config.get('DATABASE_PATH'))

    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    @app.route('/api/health', methods=['GET'])
    def health_check():
        """
        Health endpoint to verify backend status, database, and AI engine availability.
        """
        import model as model_module
        model_ready = model_module._model is not None
            
        return jsonify({
            'status': 'healthy',
            'service': 'AI-Image-Classification-DevOps',
            'version': '1.0.0',
            'ai_model': 'MobileNetV2 (ImageNet)',
            'ai_model_loaded': model_ready,
            'database': 'SQLite active'
        }), 200

    @app.route('/api/classify', methods=['POST'])
    def classify():
        """
        Endpoint to upload and classify an image.
        Accepts multipart/form-data with 'image' or 'file' key.
        """
        # Check if file was provided
        if 'image' not in request.files and 'file' not in request.files:
            return jsonify({
                'error': 'No file uploaded',
                'message': 'Please provide an image file under form field "image" or "file".'
            }), 400
            
        file = request.files.get('image') or request.files.get('file')
        
        if not file or file.filename == '':
            return jsonify({
                'error': 'Empty filename',
                'message': 'No file was selected for upload.'
            }), 400
            
        filename = secure_filename(file.filename)
        if not filename:
            filename = "uploaded_image.jpg"
            
        if not allowed_file(filename):
            return jsonify({
                'error': 'Unsupported file type',
                'message': f"Only {', '.join(sorted(ALLOWED_EXTENSIONS)).upper()} image formats are supported."
            }), 400
            
        try:
            image_bytes = file.read()
            if not image_bytes or len(image_bytes) == 0:
                return jsonify({
                    'error': 'Empty file',
                    'message': 'Uploaded image file contains zero bytes.'
                }), 400

            # Run AI Inference
            prediction_result = classify_image(image_bytes)
            
            # Save record to SQLite database
            db_path = app.config.get('DATABASE_PATH')
            record_id = insert_classification(
                filename=filename,
                predicted_category=prediction_result['predicted_category'],
                confidence_score=prediction_result['confidence_score'],
                top_predictions=prediction_result['top_predictions'],
                processing_time=prediction_result['processing_time'],
                db_path=db_path
            )
            
            response_payload = {
                'success': True,
                'id': record_id,
                'filename': filename,
                'predicted_category': prediction_result['predicted_category'],
                'confidence_score': prediction_result['confidence_score'],
                'top_predictions': prediction_result['top_predictions'],
                'processing_time': prediction_result['processing_time']
            }
            return jsonify(response_payload), 200

        except ValueError as ve:
            return jsonify({
                'error': 'Invalid image format',
                'message': str(ve)
            }), 400
        except Exception as e:
            return jsonify({
                'error': 'Classification failed',
                'message': f"Internal AI processing error: {str(e)}"
            }), 500

    @app.route('/api/history', methods=['GET'])
    def get_classification_history():
        """Returns previously classified images."""
        limit = request.args.get('limit', default=50, type=int)
        offset = request.args.get('offset', default=0, type=int)
        db_path = app.config.get('DATABASE_PATH')
        
        history = get_history(limit=limit, offset=offset, db_path=db_path)
        return jsonify({
            'success': True,
            'count': len(history),
            'history': history
        }), 200

    @app.route('/api/history/<int:record_id>', methods=['DELETE'])
    def delete_classification_record(record_id):
        """Deletes a single classification record by ID."""
        db_path = app.config.get('DATABASE_PATH')
        record = get_history_by_id(record_id, db_path=db_path)
        if not record:
            return jsonify({
                'error': 'Not found',
                'message': f"Record with ID {record_id} does not exist."
            }), 404
            
        deleted = delete_history(record_id, db_path=db_path)
        return jsonify({
            'success': deleted,
            'message': f"Record {record_id} deleted successfully."
        }), 200

    @app.route('/api/history', methods=['DELETE'])
    def clear_history():
        """Clears all classification records from history."""
        db_path = app.config.get('DATABASE_PATH')
        count = clear_all_history(db_path=db_path)
        return jsonify({
            'success': True,
            'deleted_count': count,
            'message': f"All {count} records cleared from history."
        }), 200

    @app.route('/api/stats', methods=['GET'])
    def get_dashboard_stats():
        """Returns aggregate metrics for the dashboard."""
        db_path = app.config.get('DATABASE_PATH')
        stats = get_stats(db_path=db_path)
        return jsonify({
            'success': True,
            'stats': stats
        }), 200

    @app.errorhandler(413)
    def file_too_large(error):
        return jsonify({
            'error': 'File too large',
            'message': f'File exceeds maximum permitted size of {MAX_FILE_SIZE_MB}MB.'
        }), 413

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    host = os.environ.get('HOST', '0.0.0.0')
    print(f"🚀 AI Classification Backend starting on http://{host}:{port}")
    app.run(host=host, port=port, debug=False)
