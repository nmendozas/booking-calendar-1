@echo off
taskkill /F /IM bun.exe >nul 2>&1
if %errorlevel%==0 (
    echo Servidor detenido.
) else (
    echo No habia ningun proceso de Bun ejecutandose.
)
