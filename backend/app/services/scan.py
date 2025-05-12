from sqlalchemy.ext.asyncio import AsyncSession
from app import models, schemas
from app.tasks import scan_tasks

async def create_scan(db: AsyncSession, scan: schemas.ScanCreate):
    db_scan = models.Scan(
        scan_type=scan.scan_type,  # Now matches your enum
        target=scan.target,
        command=scan.command
    )
    db.add(db_scan)
    await db.commit()
    await db.refresh(db_scan)

    # Dispatch to appropriate task
    task_mapping = {
        "nmap": scan_tasks.run_nmap,
        "masscan": scan_tasks.run_masscan,
        "zmap": scan_tasks.run_zmap,
        "nikto": scan_tasks.run_nikto
    }
    task_mapping[scan.scan_type].delay(db_scan.id, scan.target, scan.command)
    
    return db_scan
