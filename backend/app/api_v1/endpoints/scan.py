from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import ScanCreate, ScanOut
from app.services.scan_service import create_scan
from app.db.session import get_db

router = APIRouter()

@router.post("/scan", response_model=ScanOut)
async def run_scan(scan: ScanCreate, db: AsyncSession = Depends(get_db)):
    try:
        return await create_scan(db, scan)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error initiating scan: {str(e)}")
