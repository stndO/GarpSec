from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import api_router
import logging

from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from sqlalchemy import text



# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Security Scanner API",
    description="API for security scanning and vulnerability reporting",
    version="0.1.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/test-db")
async def test_db(db: AsyncSession = Depends(get_db)):
    try:
        # Try a simple SQL query
        await db.execute(text("SELECT 1"))
        return {"status": "Database connection successful!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# Include routers from the __init__.py
app.include_router(api_router)

@app.get("/", tags=["health"])
async def root():
    """Root endpoint for API health check"""
    return {"status": "online", "message": "Security Scanner API is running"}

@app.on_event("startup")
async def startup_event():
    """Initialize resources on startup"""
    logger.info("Starting Security Scanner API")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
