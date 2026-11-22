import os
import sqlite3
import json
from datetime import datetime, timezone

DEFAULT_DB_PATH = os.path.join(os.path.dirname(__file__), 'classification.db')

def get_db_path(db_path=None):
    if db_path:
        return db_path
    return os.environ.get('DATABASE_PATH', DEFAULT_DB_PATH)

def get_connection(db_path=None):
    path = get_db_path(db_path)
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    return conn

def init_db(db_path=None):
    """Initializes the database schema if tables do not exist."""
    path = get_db_path(db_path)
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with get_connection(path) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS classification_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL,
                predicted_category TEXT NOT NULL,
                confidence_score REAL NOT NULL,
                top_predictions TEXT NOT NULL,
                processing_time REAL NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('''
            CREATE INDEX IF NOT EXISTS idx_created_at ON classification_history(created_at DESC)
        ''')
        conn.commit()

def insert_classification(filename, predicted_category, confidence_score, top_predictions, processing_time, db_path=None):
    """Inserts a new classification record into the database."""
    init_db(db_path)
    top_preds_json = json.dumps(top_predictions) if not isinstance(top_predictions, str) else top_predictions
    
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO classification_history 
            (filename, predicted_category, confidence_score, top_predictions, processing_time, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (filename, predicted_category, float(confidence_score), top_preds_json, float(processing_time), datetime.now(timezone.utc).isoformat()))
        record_id = cursor.lastrowid
        conn.commit()
        return record_id

def get_history(limit=50, offset=0, db_path=None):
    """Retrieves classification history ordered by newest first."""
    init_db(db_path)
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, filename, predicted_category, confidence_score, top_predictions, processing_time, created_at
            FROM classification_history
            ORDER BY id DESC
            LIMIT ? OFFSET ?
        ''', (limit, offset))
        rows = cursor.fetchall()
        
        results = []
        for row in rows:
            record = dict(row)
            try:
                record['top_predictions'] = json.loads(record['top_predictions'])
            except Exception:
                record['top_predictions'] = []
            results.append(record)
        return results

def get_history_by_id(record_id, db_path=None):
    """Retrieves a single classification record by ID."""
    init_db(db_path)
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM classification_history WHERE id = ?', (record_id,))
        row = cursor.fetchone()
        if not row:
            return None
        record = dict(row)
        try:
            record['top_predictions'] = json.loads(record['top_predictions'])
        except Exception:
            record['top_predictions'] = []
        return record

def delete_history(record_id, db_path=None):
    """Deletes a classification record by ID."""
    init_db(db_path)
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM classification_history WHERE id = ?', (record_id,))
        conn.commit()
        return cursor.rowcount > 0

def clear_all_history(db_path=None):
    """Clears all classification records from the history table."""
    init_db(db_path)
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM classification_history')
        conn.commit()
        return cursor.rowcount

def get_stats(db_path=None):
    """Calculates overall classification statistics."""
    init_db(db_path)
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        
        # Total classifications
        cursor.execute('SELECT COUNT(*) as total FROM classification_history')
        total = cursor.fetchone()['total']
        
        if total == 0:
            return {
                'total_classifications': 0,
                'successful_classifications': 0,
                'average_processing_time': 0.0,
                'average_confidence': 0.0,
                'top_categories': [],
                'recent_activity': []
            }
        
        # Average processing time & confidence
        cursor.execute('''
            SELECT 
                AVG(processing_time) as avg_time,
                AVG(confidence_score) as avg_conf
            FROM classification_history
        ''')
        row = cursor.fetchone()
        avg_time = round(row['avg_time'] or 0.0, 3)
        avg_conf = round(row['avg_conf'] or 0.0, 2)
        
        # Top 5 most detected categories
        cursor.execute('''
            SELECT predicted_category, COUNT(*) as count
            FROM classification_history
            GROUP BY predicted_category
            ORDER BY count DESC
            LIMIT 5
        ''')
        top_cats = [dict(r) for r in cursor.fetchall()]
        
        # Recent 5 items
        recent = get_history(limit=5, offset=0, db_path=db_path)
        
        return {
            'total_classifications': total,
            'successful_classifications': total,
            'average_processing_time': avg_time,
            'average_confidence': avg_conf,
            'top_categories': top_cats,
            'recent_activity': recent
        }
