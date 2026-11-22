# Backend Dockerfile - Python Flask + TensorFlow MobileNetV2
FROM python:3.12-slim

# Prevent Python from writing .pyc files and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=5000 \
    DATABASE_PATH=/app/data/classification.db

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir gunicorn

# Copy application source code
COPY . .

# Create directory for persistent SQLite database
RUN mkdir -p /app/data

# Expose backend port
EXPOSE 5000

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:5000/api/health || exit 1

# Start production WSGI server
CMD ["gunicorn", "--workers=2", "--bind=0.0.0.0:5000", "--timeout=120", "app:create_app()"]
