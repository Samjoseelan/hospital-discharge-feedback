from datetime import date,datetime
from uuid import UUID
from pydantic import BaseModel,Field
from app.models.entities import DischargeStatus,FeedbackStatus,QRStatus

class DischargeReadyCreate(BaseModel):
    patient_id:UUID;doctor_name:str;department_name:str;ward:str;room:str
    admission_date:date;discharge_date:date;billing_completed:bool=False
class DischargeOut(BaseModel):
    id:UUID;discharge_code:str;patient_id:UUID;feedback_token:str|None;feedback_url:str|None
    qr_status:QRStatus;scan_count:int;last_scanned_at:datetime|None
    feedback_status:FeedbackStatus;feedback_submitted:bool;status:DischargeStatus;created_at:datetime
    model_config={"from_attributes":True}
class TokenPatientOut(BaseModel):
    discharge_id:UUID;discharge_code:str;patient_code:str;patient_name:str;age:int|None;gender:str|None
    doctor_name:str;department_name:str;ward:str;room:str;admission_date:date;discharge_date:date
class TokenFeedbackSubmit(BaseModel):
    ratings:dict[str,int];nps:int=Field(ge=0,le=10);recommend:bool;comments:str|None=None;consent:bool
    complaint_category:str|None=None;complaint_priority:str|None=None;complaint_description:str|None=None
class TokenFeedbackResult(BaseModel):
    reference:str;submitted_at:datetime
