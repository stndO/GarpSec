from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app import schemas, services

router = APIRouter(prefix="/scans", tags=["Scans"])

@router.post("/run", response_model=schemas.ScanOut)
async def run_scan(scan: schemas.ScanCreate, db: AsyncSession = Depends(get_db)):
    scan_obj = await services.scan.create_scan(db=db, scan=scan)
    return scan_obj

@router.get("/{scan_id}", response_model=schemas.ScanOut)
async def get_scan(scan_id: int, db: AsyncSession = Depends(get_db)):
    scan = await services.scan.get_scan(db, scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    return scan

