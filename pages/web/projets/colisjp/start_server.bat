@echo off
REM Script pour lancer un serveur local Python sur le port 8000

REM Aller dans le dossier du script
cd /d %~dp0

REM Vérifier si Python est installé
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Python n'est pas installé ou n'est pas dans le PATH.
    pause
    exit /b
)

REM Lancer le serveur
start "" http://localhost:8000/index.html
python -m http.server 8000

pause