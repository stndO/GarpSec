from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from app.models.scan import ScanTypeEnum  # Import from models

class ScanCreate(BaseModel):
    scan_type: ScanTypeEnum  # Now uses the enum
    target: str
    command: str

class ScanOut(ScanCreate):
    id: int
    status: str
    results: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
