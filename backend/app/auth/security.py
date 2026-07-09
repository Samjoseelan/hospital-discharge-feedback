from datetime import datetime,timedelta,timezone
from jose import jwt
from passlib.context import CryptContext
from app.config import settings
pwd=CryptContext(schemes=["bcrypt"],deprecated="auto")
def verify_password(plain:str,hashed:str)->bool:return pwd.verify(plain,hashed)
def hash_password(value:str)->str:return pwd.hash(value)
def create_access_token(subject:str)->str:
    expires=datetime.now(timezone.utc)+timedelta(minutes=settings.access_token_expire_minutes)
    return jwt.encode({"sub":subject,"exp":expires},settings.secret_key,algorithm="HS256")
