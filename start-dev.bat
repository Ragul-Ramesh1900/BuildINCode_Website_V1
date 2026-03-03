@echo off
echo Starting Development Servers...
echo.

echo Starting Backend Server...
start cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "npm run dev"

echo.
echo Both servers are starting in separate windows.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo Admin: http://localhost:5173/admin
