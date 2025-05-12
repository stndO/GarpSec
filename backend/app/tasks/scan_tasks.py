from celery import Celery
import subprocess
from app.models import Scan
from app.db.session import SessionLocal
import asyncio

celery_app = Celery("scan_tasks", broker="redis://localhost:6379/0")

async def async_update_scan(scan_id: int, output: str, status: str):
    async with SessionLocal() as session:
        scan = await session.get(Scan, scan_id)
        if scan:
            scan.results = output
            scan.status = status
            await session.commit()

def update_scan(scan_id: int, output: str, status: str):
    asyncio.run(async_update_scan(scan_id, output, status))

@celery_app.task(bind=True)
def run_nmap(self, scan_id: int, target: str, command: str):
    try:
        result = subprocess.run(
            ["nmap", *command.split(), target],
            capture_output=True,
            text=True,
            timeout=3600
        )
        output = result.stdout or result.stderr
        status = "completed" if result.returncode == 0 else "failed"
        update_scan(scan_id, output, status)
    except Exception as e:
        update_scan(scan_id, str(e), "failed")

@celery_app.task(bind=True)
def run_masscan(self, scan_id: int, target: str, command: str):
    try:
        result = subprocess.run(
            ["masscan", *command.split(), target],
            capture_output=True,
            text=True,
            timeout=3600
        )
        update_scan(scan_id, result.stdout or result.stderr, "completed")
    except Exception as e:
        update_scan(scan_id, str(e), "failed")

# Add similar tasks for zmap and nikto
