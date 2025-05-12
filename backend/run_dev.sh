#!/bin/bash

echo "🔄 Starting Redis..."
sudo service redis-server start

echo "🟢 Starting PostgreSQL..."
sudo service postgresql start

echo "🐍 Activating virtual environment..."
source venv/bin/activate

echo "⚡ Launching Uvicorn..."
uvicorn app.main:app --reload &

echo "📦 Launching Celery worker..."
celery -A app.tasks.scan_tasks worker --loglevel=info
