from datetime import date,datetime
from pydantic import BaseModel,Field
class RatingIn(BaseModel): category:str;score:int=Field(ge=1,le=5)
class ComplaintIn(BaseModel): category:str;priority:str;description:str
class FeedbackCreate(BaseModel):
    patient_code:str;patient_name:str;age:int|None=None;gender:str|None=None;department:str;doctor_name:str;admission_date:date;discharge_date:date;nps:int=Field(ge=0,le=10);recommend:bool;comments:str|None=None;ratings:list[RatingIn];complaint:ComplaintIn|None=None;consent:bool
class FeedbackOut(BaseModel): reference:str;created_at:datetime
class DashboardOut(BaseModel): total_feedback:int;satisfaction_rate:float;average_rating:float;nps:int;pending_complaints:int
