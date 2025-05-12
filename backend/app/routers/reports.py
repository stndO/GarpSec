from fastapi import FastAPI
from app.routers import users, scan, reports

app = FastAPI()

app.include_router(users.router)
app.include_router(scan.router)
app.include_router(reports.router)

@app.get("/")
def root():
    return {"message": "SecGarp API running"}
