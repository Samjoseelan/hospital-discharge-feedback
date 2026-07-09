from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import dashboard,discharges,feedback,qr
app=FastAPI(title="CareVoice Hospital Feedback API",version="1.0.0")
app.add_middleware(CORSMiddleware,allow_origins=[settings.frontend_url],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(feedback.router,prefix="/api/v1");app.include_router(dashboard.router,prefix="/api/v1");app.include_router(qr.router,prefix="/api/v1")
app.include_router(discharges.router,prefix="/api/v1");app.include_router(discharges.public_router,prefix="/api/v1")
@app.get("/health")
async def health():return {"status":"healthy","service":"carevoice-api"}
