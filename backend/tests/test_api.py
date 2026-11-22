import io
import os
import sys
import tempfile
import pytest
from PIL import Image

# Ensure backend directory is in python path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app import create_app
from database import init_db

def create_test_image(format='JPEG', size=(224, 224), color=(255, 0, 0)):
    """Generates an in-memory test image bytes."""
    file_bytes = io.BytesIO()
    image = Image.new('RGB', size, color=color)
    image.save(file_bytes, format=format)
    file_bytes.seek(0)
    return file_bytes

@pytest.fixture
def client(tmp_path):
    # Use temporary SQLite database for testing
    db_path = str(tmp_path / "test_classification.db")
    app = create_app({
        'TESTING': True,
        'DATABASE_PATH': db_path
    })

    with app.test_client() as client:
        with app.app_context():
            init_db(db_path)
        yield client

def test_health_endpoint(client):
    """Test /api/health endpoint returns 200 and healthy status."""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'
    assert 'ai_model' in data
    assert 'MobileNetV2' in data['ai_model']
    assert data['database'] == 'SQLite active'

def test_classify_no_file(client):
    """Test /api/classify returns 400 when no file is uploaded."""
    response = client.post('/api/classify', data={})
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data
    assert 'No file uploaded' in data['error']

def test_classify_invalid_file_extension(client):
    """Test /api/classify returns 400 when an unsupported file type is provided."""
    data = {
        'image': (io.BytesIO(b"Hello world"), 'document.txt')
    }
    response = client.post('/api/classify', data=data, content_type='multipart/form-data')
    assert response.status_code == 400
    res_data = response.get_json()
    assert 'error' in res_data
    assert 'Unsupported file type' in res_data['error']

def test_classify_corrupted_image(client):
    """Test /api/classify returns 400 when an image file is corrupted or unreadable."""
    data = {
        'image': (io.BytesIO(b"Not an actual image"), 'broken.jpg')
    }
    response = client.post('/api/classify', data=data, content_type='multipart/form-data')
    assert response.status_code == 400
    res_data = response.get_json()
    assert 'error' in res_data

def test_classify_valid_image(client):
    """Test /api/classify successfully performs MobileNetV2 prediction and saves to DB."""
    img_bytes = create_test_image('JPEG')
    data = {
        'image': (img_bytes, 'sample_red_square.jpg')
    }
    response = client.post('/api/classify', data=data, content_type='multipart/form-data')
    assert response.status_code == 200
    res_data = response.get_json()
    assert res_data['success'] is True
    assert 'predicted_category' in res_data
    assert len(res_data['predicted_category']) > 0
    assert 'confidence_score' in res_data
    assert 0 <= res_data['confidence_score'] <= 100
    assert 'top_predictions' in res_data
    assert len(res_data['top_predictions']) == 3
    assert 'processing_time' in res_data
    assert res_data['processing_time'] >= 0
    assert 'id' in res_data

def test_history_api(client):
    """Test classification history retrieval and deletion."""
    # First, classify an image to generate history
    img_bytes = create_test_image('PNG', color=(0, 255, 0))
    upload_res = client.post('/api/classify', data={'image': (img_bytes, 'green_box.png')}, content_type='multipart/form-data')
    assert upload_res.status_code == 200
    record_id = upload_res.get_json()['id']

    # Retrieve history
    history_res = client.get('/api/history')
    assert history_res.status_code == 200
    history_data = history_res.get_json()
    assert history_data['success'] is True
    assert history_data['count'] >= 1
    
    # Check that our created record exists
    ids = [item['id'] for item in history_data['history']]
    assert record_id in ids

    # Delete the record
    del_res = client.delete(f'/api/history/{record_id}')
    assert del_res.status_code == 200
    assert del_res.get_json()['success'] is True

    # Attempting to delete non-existent ID should return 404
    del_again = client.delete(f'/api/history/{record_id}')
    assert del_again.status_code == 404

def test_stats_api(client):
    """Test /api/stats calculation."""
    # Initial stats
    stats_res = client.get('/api/stats')
    assert stats_res.status_code == 200
    initial_stats = stats_res.get_json()['stats']
    assert 'total_classifications' in initial_stats
    assert 'average_processing_time' in initial_stats

    # Insert a classification
    img_bytes = create_test_image('JPEG', color=(0, 0, 255))
    client.post('/api/classify', data={'image': (img_bytes, 'blue_box.jpg')}, content_type='multipart/form-data')

    # Verify updated stats
    updated_res = client.get('/api/stats')
    assert updated_res.status_code == 200
    updated_stats = updated_res.get_json()['stats']
    assert updated_stats['total_classifications'] == initial_stats['total_classifications'] + 1
