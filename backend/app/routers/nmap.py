from fastapi import APIRouter
from pydantic import BaseModel
from app.modules.nmap.service import run_nmap_scan

router = APIRouter()

class NmapScanRequest(BaseModel):
    target: str
    options: str = "-sV"

@router.post("/scan/nmap")
def scan_nmap(request: NmapScanRequest):
    output = run_nmap_scan(request.target, request.options)
    return {"result": output}
