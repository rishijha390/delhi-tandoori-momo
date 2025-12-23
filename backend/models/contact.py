from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ContactMessage(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    message: str
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    message: str