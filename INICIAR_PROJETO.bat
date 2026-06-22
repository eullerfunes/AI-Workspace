@echo off
chcp 65001 >nul
echo ========================================
echo    BarberFlow - Inicializador
echo ========================================
echo.

echo [1/3] Verificando PostgreSQL...
psql --version >nul 2>&1
if errorlevel 1 (
    echo ❌ PostgreSQL não encontrado.
    echo.
    echo Instale o PostgreSQL em: https://www.postgresql.org/download/windows/
    echo Ou use o instalador: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
    echo.
    echo Apos instalar, certifique-se de que o servico esta rodando.
    pause
    exit /b 1
)
echo ✅ PostgreSQL encontrado

echo.
echo [2/3] Executando migrations e seed...
cd /d "%~dp0server"
call npx prisma migrate dev --name init
call npx prisma db seed

echo.
echo [3/3] Verificando DATABASE_URL no arquivo .env...
findstr /C:"DATABASE_URL=" "%~dp0server\.env" >nul
if errorlevel 1 (
    echo ⚠️  DATABASE_URL nao encontrada no arquivo server\.env
    echo.
    echo Configure o arquivo server\.env com:
    echo DATABASE_URL="postgresql://postgres:SENHA@localhost:5432/barberflow"
    echo.
) else (
    echo ✅ DATABASE_URL configurada
)

echo.
echo ========================================
echo    ✅ Projeto configurado com sucesso!
echo ========================================
echo.
echo Para iniciar o backend:
echo   cd server
echo   npm run dev
echo.
echo Para iniciar o frontend (em outro terminal):
echo   cd web
echo   npm run dev
echo.
echo Acesse: http://localhost:5173
echo.
pause
