@echo off
echo ======================================================================
echo  Launching Full-Stack AI Image Classification System
echo ======================================================================
echo 1. Launching Backend on http://localhost:5000 ...
start "AI Backend Server" cmd /k "cd /d "%~dp0backend" && python app.py"

echo 2. Waiting 3 seconds for backend initialization ...
timeout /t 3 /nobreak >nul

echo 3. Launching Frontend on http://localhost:5173 ...
start "AI Frontend Client" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ======================================================================
echo  Both services launched!
echo  Frontend UI: http://localhost:5173
echo  Backend API: http://localhost:5000/api/health
echo ======================================================================
