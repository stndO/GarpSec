from sqlalchemy import Column, String, Enum, Text, DateTime, Integer
from sqlalchemy.sql import func
from app.db.base import Base
import enum

class ScanStatusEnum(str, enum.Enum):
    pending = "pending"
    running = "running"
    completed = "completed"
    failed = "failed"  # Recommended addition

class ScanTypeEnum(str, enum.Enum):
    nmap = "nmap"
    masscan = "masscan" 
    zmap = "zmap"
    nikto = "nikto"

class Scan(Base):
    __tablename__ = "scans"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    scan_type = Column(Enum(ScanTypeEnum), nullable=False, default="nmap")
    target = Column(String, nullable=False)
    command = Column(String, nullable=False)
    status = Column(Enum(ScanStatusEnum), default=ScanStatusEnum.pending)
    results = Column(Text)  # Changed from JSON to Text for raw tool output
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    owner_id = Column(String)
