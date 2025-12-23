from pydantic import BaseModel, Field
from datetime import datetime

class Review(BaseModel):
    name: str
    rating: int
    review: str
    avatar: str = ""
    date: str = ""
    is_approved: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ReviewCreate(BaseModel):
    name: str
    rating: int
    review: str