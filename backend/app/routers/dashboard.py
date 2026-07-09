from fastapi import APIRouter,Depends
from sqlalchemy import func,select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.models.entities import Complaint,ComplaintStatus,Feedback,Rating
from app.schemas.feedback import DashboardOut
router=APIRouter(prefix="/dashboard",tags=["dashboard"])
@router.get("",response_model=DashboardOut)
async def dashboard(db:AsyncSession=Depends(get_db)):
    total=await db.scalar(select(func.count(Feedback.id))) or 0
    avg=await db.scalar(select(func.avg(Rating.score))) or 0
    promoters=await db.scalar(select(func.count(Feedback.id)).where(Feedback.nps>=9)) or 0
    detractors=await db.scalar(select(func.count(Feedback.id)).where(Feedback.nps<=6)) or 0
    pending=await db.scalar(select(func.count(Complaint.id)).where(Complaint.status.in_([ComplaintStatus.pending,ComplaintStatus.in_progress]))) or 0
    return DashboardOut(total_feedback=total,satisfaction_rate=round(float(avg)/5*100,1),average_rating=round(float(avg),1),nps=round((promoters-detractors)/total*100) if total else 0,pending_complaints=pending)
