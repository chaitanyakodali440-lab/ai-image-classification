# AI-Based Image Classification System

[![CI/CD Pipeline](https://github.com/chaitanyakodali440-lab/ai-image-classification/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/chaitanyakodali440-lab/ai-image-classification/actions)
[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.1-green.svg)](https://flask.palletsprojects.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.21-orange.svg)](https://www.tensorflow.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An enterprise-grade, full-stack deep learning web application that performs real-time visual object classification powered by **TensorFlow MobileNetV2 (ImageNet)**, complete with persistent **SQLite** telemetry, responsive **React + Vite** dashboard, automated **Pytest** suites, **Docker Compose** containerization, and **GitHub Actions CI/CD** cloud deployment to **Render**.

---

## 1. Project Introduction & Problem Statement

### Introduction
Modern software engineering requires Machine Learning models to move beyond isolated Jupyter notebooks into robust, reliable, and continuously delivered web applications. This project demonstrates how an AI computer vision model can be industrialized using modern DevOps practices across the entire Software Development Life Cycle (SDLC).

### Problem Statement
Deploying deep learning models traditionally suffers from:
- Environment discrepancies ("works on my machine" syndrome).
- Heavyweight model weights causing deployment bottlenecks.
- Lack of automated regression tests before shipping code.
- Manual and error-prone deployment procedures.
- Absence of operational telemetry tracking inference latency and accuracy.

### Solution
This application resolves these challenges by packaging a lightweight convolutional neural network (**MobileNetV2**) inside reproducible **Docker** containers, guarded by automated **Pytest** verification in **GitHub Actions**, and continuously delivered to cloud environments with persistent database analytics.

---

## 2. System Architecture

```
                          ┌──────────────────────────────────────┐
                          │         Client Web Browser           │
                          │   (Desktop, Tablet, Mobile)          │
                          └──────────────────┬───────────────────┘
                                             │ HTTP / JSON
                                             ▼
                          ┌──────────────────────────────────────┐
                          │     Frontend Service (Port 3000)     │
                          │   React 18 + Vite + Tailwind CSS     │
                          │     (Served via Alpine Nginx)        │
                          └──────────────────┬───────────────────┘
                                             │ Reverse Proxy /api
                                             ▼
                          ┌──────────────────────────────────────┐
                          │     Backend Service (Port 5000)      │
                          │       Python 3.12 Flask REST API     │
                          │        Gunicorn WSGI Container       │
                          └───────┬──────────────────────┬───────┘
                                  │                      │
                   In-Memory      │                      │ SQL CRUD
                   Inference      ▼                      ▼
                    ┌───────────────────┐      ┌───────────────────┐
                    │  AI Engine        │      │ SQLite Database   │
                    │  TensorFlow       │      │ classification.db │
                    │  MobileNetV2      │      │ (Volume Mounted)  │
                    │  (ImageNet 1K)    │      └───────────────────┘
                    └───────────────────┘
```

---

## 3. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend** | React.js | 18.3.1 | Single-Page Application component architecture |
| | Vite | 5.4.8 | High-performance build tool and dev server |
| | Tailwind CSS | 3.4.13 | Utility-first responsive styling and Navy theme |
| | Axios | 1.7.7 | Promise-based HTTP client for API communication |
| | Lucide React | 0.453 | Modern SVG iconography |
| | React Router DOM | 6.26 | Client-side declarative routing |
| **Backend** | Python | 3.12 | Core programming runtime |
| | Flask | 3.1.3 | Micro web framework for REST API |
| | Flask-CORS | 6.0.5 | Cross-Origin Resource Sharing handling |
| | Gunicorn | 23.0 | Production WSGI HTTP server |
| **AI / ML** | TensorFlow | 2.21.0 | Deep learning framework |
| | Keras Applications | MobileNetV2 | Depthwise separable CNN (3.4M parameters) |
| | ImageNet | 1,000 Classes | Visual taxonomy benchmark |
| | Pillow | 12.2.0 | Image processing, resizing, and normalization |
| **Database** | SQLite3 | Native | Zero-configuration ACID relational storage |
| **DevOps & QA**| Docker | Engine 24+ | Containerization standard |
| | Docker Compose | 3.8 Spec | Multi-container orchestration |
| | Pytest | 9.1.1 | Automated endpoint, validation, and AI tests |
| | GitHub Actions | Workflows v4 | Continuous Integration and Deployment |
| | Render Cloud | PaaS | Web Service & Static Site hosting |

---

## 4. Key Features

- **Actual AI Inference**: Real predictions powered by TensorFlow MobileNetV2 (no mock data or hardcoded outputs).
- **Top-3 Prediction Candidates**: Displays primary category and top 3 candidate categories with visual confidence percentage bars.
- **Instant Image Preview**: Drag-and-drop or file browser with client-side preview before submitting.
- **Input Sanitization & Protection**: Strict MIME type gating (JPG, JPEG, PNG only), 10MB size limits, and corrupted image protection.
- **Persistent Telemetry**: Logs each classification filename, predicted label, confidence score, processing latency, and timestamp into SQLite.
- **Interactive Analytics Dashboard**: Live metrics tracking total classifications, success rates, average latency, and top detected classes.
- **Classification History Manager**: Filterable history table with search query capabilities and single-record / clear-all deletion.
- **High-Performance Docker Packaging**: Multi-stage Alpine Nginx frontend build and slim Python backend container with automated health checks.

---

## 5. Project Directory Structure

```
ai-image-classification-devops/
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # GitHub Actions CI/CD automation pipeline
├── backend/
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_api.py           # Automated Pytest test suite (7 tests)
│   ├── app.py                    # Flask REST API endpoints and error handlers
│   ├── database.py               # SQLite schema, queries, CRUD, and telemetry
│   ├── Dockerfile                # Backend containerization definition
│   ├── .dockerignore             # Exclusions for Docker build context
│   ├── model.py                  # Singleton MobileNetV2 loader & inference engine
│   └── requirements.txt          # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Sticky navigation with live API health pulse
│   │   │   └── Footer.jsx        # Footer with tech specs and architecture links
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Hero, workflow steps, stack cards, pipeline
│   │   │   ├── Classify.jsx      # Upload, preview, loading spinner, top-3 results
│   │   │   ├── Dashboard.jsx     # KPI metrics, latency stats, frequency charts
│   │   │   ├── History.jsx       # Searchable SQLite table with delete actions
│   │   │   └── About.jsx         # Deep-dive on MobileNetV2 and DevOps pillars
│   │   ├── services/
│   │   │   └── api.js            # Axios client with interceptors
│   │   ├── App.jsx               # Application routes & layout wrapper
│   │   ├── index.css             # Tailwind directives and custom scrollbar
│   │   └── main.jsx              # DOM entrypoint
│   ├── Dockerfile                # Multi-stage production build (Node -> Nginx)
│   ├── index.html                # HTML5 template
│   ├── nginx.conf                # Nginx reverse proxy configuration
│   ├── package.json              # NPM dependencies & scripts
│   ├── postcss.config.js         # PostCSS configuration
│   ├── tailwind.config.js        # Custom Navy & Brand color system
│   └── vite.config.js            # Vite build configuration with proxy
├── docker-compose.yml            # Multi-container orchestration (Frontend + Backend)
├── run_all.bat                   # 1-Click launcher for both services (Windows)
├── run_backend.bat               # 1-Click backend launcher
├── run_frontend.bat              # 1-Click frontend launcher
├── run_tests.bat                 # 1-Click test runner
├── .gitignore                    # Comprehensive repository exclusions
└── README.md                     # Documentation & deployment guide
```

---

## 6. Installation & Local Execution

### Prerequisites
- Python 3.10+ (Python 3.12 recommended)
- Node.js 18+ or 20+ and npm
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/chaitanyakodali440-lab/ai-image-classification.git
cd ai-image-classification-devops
```

### Step 2: Setup and Run Backend
```bash
# Navigate to backend directory
cd backend

# Create and activate a virtual environment (optional but recommended)
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start Flask Backend server
python app.py
```
*Backend runs on: `http://localhost:5000`*

### Step 3: Setup and Run Frontend
Open a new terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

> **Windows 1-Click Convenience**:
> You can simply double-click `run_all.bat` in the root folder to start both services concurrently!

---

## 7. Docker Execution (Containerized)

To build and run the entire full-stack application using Docker:

### Prerequisites
- Docker Engine & Docker Compose installed.

### Run with Docker Compose
```bash
# Build images and start containers in detached mode
docker-compose up --build -d

# Check running container statuses
docker-compose ps

# View live container logs
docker-compose logs -f
```

### Accessing Docker Services
- **Frontend Web UI**: `http://localhost:3000`
- **Backend Health Check**: `http://localhost:5000/api/health`

### Stop Docker Containers
```bash
docker-compose down
```
*(Database records are safely persisted in the `ai_classification_sqlite_data` Docker volume).*

---

## 8. REST API Documentation

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Verifies service status, AI model readiness, and SQLite database connectivity.
- **Response `200 OK`**:
```json
{
  "status": "healthy",
  "service": "AI-Image-Classification-DevOps",
  "version": "1.0.0",
  "ai_model": "MobileNetV2 (ImageNet)",
  "ai_model_loaded": true,
  "database": "SQLite active"
}
```

### 2. Classify Image
- **Endpoint**: `POST /api/classify`
- **Content-Type**: `multipart/form-data`
- **Body**: `image` (binary file: JPG, JPEG, or PNG; max 10MB)
- **Response `200 OK`**:
```json
{
  "success": true,
  "id": 1,
  "filename": "golden_retriever.jpg",
  "predicted_category": "Golden Retriever",
  "confidence_score": 94.62,
  "top_predictions": [
    {
      "rank": 1,
      "class_id": "n02099712",
      "label": "Golden Retriever",
      "confidence": 94.62,
      "confidence_pct": "94.6%"
    },
    {
      "rank": 2,
      "class_id": "n02099601",
      "label": "Labrador Retriever",
      "confidence": 3.18,
      "confidence_pct": "3.2%"
    },
    {
      "rank": 3,
      "class_id": "n02102318",
      "label": "Cocker Spaniel",
      "confidence": 0.85,
      "confidence_pct": "0.9%"
    }
  ],
  "processing_time": 0.124
}
```

### 3. Classification History
- **Endpoint**: `GET /api/history?limit=50&offset=0`
- **Description**: Returns chronological classification records (newest first).
- **Response `200 OK`**:
```json
{
  "success": true,
  "count": 1,
  "history": [
    {
      "id": 1,
      "filename": "golden_retriever.jpg",
      "predicted_category": "Golden Retriever",
      "confidence_score": 94.62,
      "processing_time": 0.124,
      "created_at": "2026-11-22T12:00:00Z"
    }
  ]
}
```

### 4. Delete History Record
- **Endpoint**: `DELETE /api/history/:id`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Record 1 deleted successfully."
}
```

### 5. Clear All History
- **Endpoint**: `DELETE /api/history`
- **Response `200 OK`**:
```json
{
  "success": true,
  "deleted_count": 15,
  "message": "All 15 records cleared from history."
}
```

### 6. Analytics Statistics
- **Endpoint**: `GET /api/stats`
- **Response `200 OK`**:
```json
{
  "success": true,
  "stats": {
    "total_classifications": 15,
    "successful_classifications": 15,
    "average_processing_time": 0.138,
    "average_confidence": 88.45,
    "top_categories": [
      { "predicted_category": "Golden Retriever", "count": 6 },
      { "predicted_category": "Sports Car", "count": 4 }
    ],
    "recent_activity": [ ... ]
  }
}
```

---

## 9. Automated Testing (Pytest)

The project includes an automated test suite verifying endpoint contracts, file security validation, AI tensor processing, and database transactions.

### Running Tests Locally
```bash
cd backend
python -m pytest -v tests/test_api.py
```

### Test Coverage Highlights
| Test Case | Description | Expected Status |
| :--- | :--- | :--- |
| `test_health_endpoint` | Verifies `/api/health` returns healthy and model loaded | `200 OK` |
| `test_classify_no_file` | Validates rejection when no image payload is provided | `400 Bad Request` |
| `test_classify_invalid_file_extension` | Validates rejection of unauthorized file formats (.txt, .exe) | `400 Bad Request` |
| `test_classify_corrupted_image` | Validates error handling for corrupted byte payloads | `400 Bad Request` |
| `test_classify_valid_image` | Generates synthetic RGB image, runs inference, verifies top-3 | `200 OK` |
| `test_history_api` | Tests CRUD: insert, retrieve list, delete by ID, verify 404 on retry | `200 / 404` |
| `test_stats_api` | Verifies aggregate metrics update accurately upon new classifications | `200 OK` |

---

## 10. DevOps & CI/CD Pipeline

The `.github/workflows/ci-cd.yml` pipeline runs automatically on every push or pull request to `main`.

```
Push to main
     │
     ▼
┌─────────────────────────┐
│ 1. Backend CI Job       │
│ - Setup Python 3.12     │
│ - Install requirements  │
│ - Flake8 Code Quality   │
│ - Pytest Suite (7/7)    │
└────────────┬────────────┘
             │ Pass
             ▼
┌─────────────────────────┐
│ 2. Frontend CI Job      │
│ - Setup Node.js 20      │
│ - npm ci dependencies   │
│ - Vite production build │
│ - Artifact packaging    │
└────────────┬────────────┘
             │ Pass
             ▼
┌─────────────────────────┐
│ 3. Docker CI Job        │
│ - Build Backend Image   │
│ - Build Frontend Image  │
│ - Smoke Test Containers │
└────────────┬────────────┘
             │ Pass
             ▼
┌─────────────────────────┐
│ 4. Continuous Deploy    │
│ - Trigger Render Hook   │
│ - Zero-Downtime Rollout │
└─────────────────────────┘
```

---

## 11. Cloud Deployment Guide (Render)

This application is ready to deploy to **Render** (or any cloud container platform like AWS ECS, Google Cloud Run, or Azure App Service).

### Option A: Deploying Backend as a Docker Web Service on Render
1. Create a free account at [render.com](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository: `your-username/ai-image-classification-devops`.
4. Configure service settings:
   - **Name**: `ai-classification-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Docker`
   - **Branch**: `main`
   - **Plan**: Free
5. Add Environment Variables:
   - `PORT`: `5000`
   - `DATABASE_PATH`: `/app/data/classification.db`
6. Click **Create Web Service**.
7. Copy the public backend URL (e.g., `https://ai-classification-backend.onrender.com`).

### Option B: Deploying Frontend as a Static Site on Render
1. In Render, click **New +** → **Static Site**.
2. Connect the same GitHub repository.
3. Configure settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add Environment Variable:
   - `VITE_API_URL`: `https://ai-classification-backend.onrender.com`
5. Click **Create Static Site**.

### Option C: Automated CD via Deploy Hook
1. In your Render Backend Service, navigate to **Settings** → **Deploy Hook**.
2. Copy the Deploy Hook URL.
3. In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**.
4. Add a secret named `RENDER_DEPLOY_HOOK_URL` and paste the URL.
5. Every future `git push` to `main` will automatically test, build, and deploy the updated application!

---

## 12. Academic Project Verification Checklist

- [x] Functional frontend (React 18 + Vite + Tailwind CSS)
- [x] Functional backend (Flask REST API with CORS)
- [x] Genuine AI inference (MobileNetV2 pretrained ImageNet weights)
- [x] Top-3 predicted categories with confidence percentages
- [x] SQLite database tracking classification history and latency
- [x] Analytics dashboard with KPI telemetry
- [x] History page with individual deletion and clear-all
- [x] Automated Pytest test suite (100% pass rate)
- [x] Backend Dockerfile (Python 3.12 slim + Gunicorn)
- [x] Frontend Dockerfile (Multi-stage Node 20 + Nginx Alpine)
- [x] Docker Compose multi-service orchestration with persistent volume
- [x] GitHub Actions CI/CD workflow (.github/workflows/ci-cd.yml)
- [x] Production deployment documentation for Render

---

## 13. License

Distributed under the MIT License. See `LICENSE` for more information.
