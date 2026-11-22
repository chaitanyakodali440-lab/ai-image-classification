@echo off
echo ========================================================
echo  Running Pytest Automated Test Suite
echo ========================================================
cd /d "%~dp0backend"
python -m pytest -v tests/test_api.py
pause
