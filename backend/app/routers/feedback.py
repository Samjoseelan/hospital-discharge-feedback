import secrets
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.models.entities import Complaint,Department,Feedback,Patient,Rating
from app.schemas.feedback import FeedbackCreate,FeedbackOut
router=APIRouter(prefix="/feedback",tags=["feedback"])
@router.post("",response_model=FeedbackOut,status_code=201)
async def create_feedback(data:FeedbackCreate,db:AsyncSession=Depends(get_db)):
    if not data.consent: raise HTTPException(422,"Consent is required")
    patient=(await db.execute(select(Patient).where(Patient.patient_code==data.patient_code))).scalar_one_or_none()
    if not patient: patient=Patient(patient_code=data.patient_code,name=data.patient_name,age=data.age,gender=data.gender);db.add(patient);await db.flush()
    department=(await db.execute(select(Department).where(Department.name==data.department))).scalar_one_or_none()
    if not department: department=Department(name=data.department);db.add(department);await db.flush()
    item=Feedback(reference=f"FB-{secrets.randbelow(900000)+100000}",patient_id=patient.id,department_id=department.id,doctor_name=data.doctor_name,admission_date=data.admission_date,discharge_date=data.discharge_date,nps=data.nps,recommend=data.recommend,comments=data.comments)
    db.add(item);await db.flush()
    db.add_all([Rating(feedback_id=item.id,category=r.category,score=r.score) for r in data.ratings])
    if data.complaint: db.add(Complaint(feedback_id=item.id,category=data.complaint.category,priority=data.complaint.priority,description=data.complaint.description))
    await db.commit();await db.refresh(item);return item
