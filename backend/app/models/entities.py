import enum,uuid
from datetime import date,datetime
from sqlalchemy import Boolean,Date,DateTime,Enum,Float,ForeignKey,Integer,String,Text
from sqlalchemy.orm import Mapped,mapped_column,relationship
from app.database.base import Base
class ComplaintStatus(str,enum.Enum): pending="pending";in_progress="in_progress";resolved="resolved";closed="closed"
class QRStatus(str,enum.Enum): active="active";disabled="disabled";expired="expired"
class FeedbackStatus(str,enum.Enum): pending="pending";submitted="submitted"
class DischargeStatus(str,enum.Enum): ready="ready";discharged="discharged"
class Department(Base):
    __tablename__="departments";id:Mapped[uuid.UUID]=mapped_column(primary_key=True,default=uuid.uuid4);name:Mapped[str]=mapped_column(String(100),unique=True)
class Patient(Base):
    __tablename__="patients";id:Mapped[uuid.UUID]=mapped_column(primary_key=True,default=uuid.uuid4);patient_code:Mapped[str]=mapped_column(String(50),unique=True,index=True);name:Mapped[str]=mapped_column(String(120));age:Mapped[int|None];gender:Mapped[str|None]=mapped_column(String(30))
class Feedback(Base):
    __tablename__="feedback";id:Mapped[uuid.UUID]=mapped_column(primary_key=True,default=uuid.uuid4);reference:Mapped[str]=mapped_column(String(30),unique=True,index=True);patient_id:Mapped[uuid.UUID]=mapped_column(ForeignKey("patients.id"));discharge_id:Mapped[uuid.UUID|None]=mapped_column(ForeignKey("discharges.id"),unique=True);department_id:Mapped[uuid.UUID|None]=mapped_column(ForeignKey("departments.id"));doctor_name:Mapped[str]=mapped_column(String(120));admission_date:Mapped[date];discharge_date:Mapped[date];nps:Mapped[int];recommend:Mapped[bool]=mapped_column(Boolean);comments:Mapped[str|None]=mapped_column(Text);created_at:Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow);patient:Mapped[Patient]=relationship()
class Rating(Base):
    __tablename__="ratings";id:Mapped[uuid.UUID]=mapped_column(primary_key=True,default=uuid.uuid4);feedback_id:Mapped[uuid.UUID]=mapped_column(ForeignKey("feedback.id",ondelete="CASCADE"));category:Mapped[str]=mapped_column(String(80));score:Mapped[int]
class Complaint(Base):
    __tablename__="complaints";id:Mapped[uuid.UUID]=mapped_column(primary_key=True,default=uuid.uuid4);feedback_id:Mapped[uuid.UUID]=mapped_column(ForeignKey("feedback.id"));category:Mapped[str]=mapped_column(String(80));priority:Mapped[str]=mapped_column(String(20));description:Mapped[str]=mapped_column(Text);status:Mapped[ComplaintStatus]=mapped_column(Enum(ComplaintStatus),default=ComplaintStatus.pending);assignee:Mapped[str|None]=mapped_column(String(120));created_at:Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow)
class User(Base):
    __tablename__="users";id:Mapped[uuid.UUID]=mapped_column(primary_key=True,default=uuid.uuid4);email:Mapped[str]=mapped_column(String(180),unique=True,index=True);hashed_password:Mapped[str]=mapped_column(String(255));role:Mapped[str]=mapped_column(String(30),default="manager");is_active:Mapped[bool]=mapped_column(Boolean,default=True)
class QRCode(Base):
    __tablename__="qr_codes";id:Mapped[uuid.UUID]=mapped_column(primary_key=True,default=uuid.uuid4);token:Mapped[str]=mapped_column(String(120),unique=True,index=True);scope_type:Mapped[str]=mapped_column(String(30));scope_value:Mapped[str]=mapped_column(String(120));active:Mapped[bool]=mapped_column(Boolean,default=True);created_at:Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow)
class Discharge(Base):
    __tablename__="discharges"
    id:Mapped[uuid.UUID]=mapped_column(primary_key=True,default=uuid.uuid4)
    discharge_code:Mapped[str]=mapped_column(String(40),unique=True,index=True)
    patient_id:Mapped[uuid.UUID]=mapped_column(ForeignKey("patients.id"),index=True)
    doctor_name:Mapped[str]=mapped_column(String(120))
    department_name:Mapped[str]=mapped_column(String(120))
    ward:Mapped[str]=mapped_column(String(80))
    room:Mapped[str]=mapped_column(String(30))
    admission_date:Mapped[date]=mapped_column(Date)
    discharge_date:Mapped[date]=mapped_column(Date)
    billing_completed:Mapped[bool]=mapped_column(Boolean,default=False)
    status:Mapped[DischargeStatus]=mapped_column(Enum(DischargeStatus),default=DischargeStatus.ready)
    feedback_token:Mapped[str|None]=mapped_column(String(120),unique=True,index=True)
    feedback_url:Mapped[str|None]=mapped_column(String(500))
    qr_status:Mapped[QRStatus]=mapped_column(Enum(QRStatus),default=QRStatus.disabled)
    scan_count:Mapped[int]=mapped_column(Integer,default=0)
    last_scanned_at:Mapped[datetime|None]=mapped_column(DateTime)
    feedback_status:Mapped[FeedbackStatus]=mapped_column(Enum(FeedbackStatus),default=FeedbackStatus.pending)
    feedback_submitted:Mapped[bool]=mapped_column(Boolean,default=False)
    submitted_at:Mapped[datetime|None]=mapped_column(DateTime)
    created_at:Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow)
    patient:Mapped[Patient]=relationship()
