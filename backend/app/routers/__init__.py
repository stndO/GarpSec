from fastapi import APIRouter
from . import nmap, scan, users

api_router = APIRouter()

api_router.include_router(nmap.router, prefix="", tags=["Nmap"])
api_router.include_router(scan.router)
api_router.include_router(users.router)

