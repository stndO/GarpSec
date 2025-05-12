from celery import Celery
import subprocess
import asyncio
from sqlalchemy.future import select
from app.models import Scan
from app.db.session import SessionLocal

celery_app = Celery("scan_tasks", broker="redis://localhost:6379/0")

async def async_update_scan_result(scan_id: int, output: str):
    async with SessionLocal() as session:
        result = await session.execute(select(Scan).where(Scan.id == scan_id))
        scan = result.scalar_one_or_none()
        if scan:
            scan.results = output
            scan.status = "completed"
            await session.commit()

def update_scan_result(scan_id: int, output: str):
    asyncio.run(async_update_scan_result(scan_id, output))  # ✓

@celery_app.task
def run_nmap(scan_id: int, target: str, command: str):
    full_cmd = f"nmap {command} {target}"
    result = subprocess.getoutput(full_cmd)
    update_scan_result(scan_id, result)  # ✓

@celery_app.task
def run_hydra(scan_id: int, target: str, command: str):
    full_cmd = f"hydra {command} {target}"
    result = subprocess.getoutput(full_cmd)
    update_scan_result(scan_id, result)  # ✓

@celery_app.task
def run_sqlmap(scan_id: int, target: str, command: str):
    full_cmd = f"sqlmap {command} -u {target} --batch"
    result = subprocess.getoutput(full_cmd)
    update_scan_result(scan_id, result)  # ✓
