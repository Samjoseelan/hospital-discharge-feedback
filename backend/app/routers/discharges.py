from datetime import datetime
from io import BytesIO
import qrcode,secrets
from fastapi import APIRouter,Depends,HTTPException,Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.config import settings
from app.database.session import get_db
from app.models.entities import Discharge,DischargeStatus,Feedback,FeedbackStatus,Patient,QRStatus,Rating
from app.schemas.discharge import DischargeOut,DischargeReadyCreate,TokenFeedbackResult,TokenFeedbackSubmit,TokenPatientOut

router=APIRouter(prefix="/discharges",tags=["discharges"])
@router.get("",response_model=list[DischargeOut])
async def list_discharges(db:AsyncSession=Depends(get_db)):
    return (await db.scalars(select(Discharge).order_by(Discharge.created_at.desc()))).all()
@router.post("/ready",response_model=DischargeOut,status_code=201)
async def create_ready(data:DischargeReadyCreate,db:AsyncSession=Depends(get_db)):
    item=Discharge(discharge_code=f"READY-{secrets.randbelow(900000)+100000}",**data.model_dump())
    db.add(item);await db.commit();await db.refresh(item);return item
@router.post("/{discharge_id}/complete",response_model=DischargeOut)
async def complete_discharge(discharge_id:str,db:AsyncSession=Depends(get_db)):
    item=await db.get(Discharge,discharge_id)
    if not item:raise HTTPException(404,"Discharge record not found")
    if not item.billing_completed:raise HTTPException(409,"Billing must be completed first")
    if item.status==DischargeStatus.discharged:return item
    token=f"fb_{secrets.token_urlsafe(18)}";item.discharge_code=f"DIS-{datetime.utcnow():%Y}-{secrets.randbelow(900000)+100000}";item.feedback_token=token;item.feedback_url=f"{settings.frontend_url}/feedback/{token}";item.qr_status=QRStatus.active;item.feedback_status=FeedbackStatus.pending;item.status=DischargeStatus.discharged
    await db.commit();await db.refresh(item);return item
@router.get("/{discharge_id}/qr")
async def download_qr(discharge_id:str,db:AsyncSession=Depends(get_db)):
    item=await db.get(Discharge,discharge_id)
    if not item or not item.feedback_url:raise HTTPException(404,"Active discharge QR not found")
    image=qrcode.make(item.feedback_url);stream=BytesIO();image.save(stream,format="PNG")
    return Response(stream.getvalue(),media_type="image/png",headers={"Content-Disposition":f'attachment; filename="{item.discharge_code}.png"'})
@router.patch("/{discharge_id}/qr-status",response_model=DischargeOut)
async def update_qr_status(discharge_id:str,status:QRStatus,db:AsyncSession=Depends(get_db)):
    item=await db.get(Discharge,discharge_id)
    if not item:raise HTTPException(404,"Discharge record not found")
    item.qr_status=status;await db.commit();await db.refresh(item);return item

public_router=APIRouter(prefix="/feedback-links",tags=["public-feedback"])
async def active_discharge(token:str,db:AsyncSession):
    item=(await db.execute(select(Discharge).where(Discharge.feedback_token==token))).scalar_one_or_none()
    if not item:raise HTTPException(404,"Feedback link not found")
    if item.qr_status!=QRStatus.active:raise HTTPException(410,"Feedback link is no longer active")
    return item
@public_router.get("/{token}",response_model=TokenPatientOut)
async def open_feedback_link(token:str,db:AsyncSession=Depends(get_db)):
    item=await active_discharge(token,db)
    if item.feedback_submitted:raise HTTPException(409,"Feedback already submitted")
    item.scan_count+=1;item.last_scanned_at=datetime.utcnow();await db.commit()
    patient=await db.get(Patient,item.patient_id)
    return TokenPatientOut(discharge_id=item.id,discharge_code=item.discharge_code,patient_code=patient.patient_code,patient_name=patient.name,age=patient.age,gender=patient.gender,doctor_name=item.doctor_name,department_name=item.department_name,ward=item.ward,room=item.room,admission_date=item.admission_date,discharge_date=item.discharge_date)
@public_router.post("/{token}",response_model=TokenFeedbackResult,status_code=201)
async def submit_token_feedback(token:str,data:TokenFeedbackSubmit,db:AsyncSession=Depends(get_db)):
    item=await active_discharge(token,db)
    if item.feedback_submitted:raise HTTPException(409,"Feedback already submitted")
    if not data.consent:raise HTTPException(422,"Consent is required")
    reference=f"FB-{secrets.randbelow(900000)+100000}"
    feedback=Feedback(reference=reference,patient_id=item.patient_id,discharge_id=item.id,doctor_name=item.doctor_name,admission_date=item.admission_date,discharge_date=item.discharge_date,nps=data.nps,recommend=data.recommend,comments=data.comments)
    db.add(feedback);await db.flush();db.add_all([Rating(feedback_id=feedback.id,category=k,score=v) for k,v in data.ratings.items()])
    item.feedback_submitted=True;item.feedback_status=FeedbackStatus.submitted;item.submitted_at=datetime.utcnow()
    await db.commit();return TokenFeedbackResult(reference=reference,submitted_at=item.submitted_at)
