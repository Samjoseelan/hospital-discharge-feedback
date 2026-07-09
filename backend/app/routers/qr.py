from io import BytesIO
import qrcode,secrets
from fastapi import APIRouter,Depends,Response
from sqlalchemy.ext.asyncio import AsyncSession
from app.config import settings
from app.database.session import get_db
from app.models.entities import QRCode
router=APIRouter(prefix="/qr-codes",tags=["qr-codes"])
@router.post("")
async def create_qr(scope_type:str,scope_value:str,db:AsyncSession=Depends(get_db)):
    token=secrets.token_urlsafe(24);db.add(QRCode(token=token,scope_type=scope_type,scope_value=scope_value));await db.commit()
    image=qrcode.make(f"{settings.frontend_url}/feedback/{token}");stream=BytesIO();image.save(stream,format="PNG")
    return Response(stream.getvalue(),media_type="image/png",headers={"Content-Disposition":f'attachment; filename="carevoice-{scope_type}.png"'})
