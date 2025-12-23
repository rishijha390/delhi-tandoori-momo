from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class MenuItem(BaseModel):
    item_id: int
    name: str
    description: str
    price: int
    category: str
    image: str
    is_veg: bool
    is_available: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class MenuItemCreate(BaseModel):
    item_id: int
    name: str
    description: str
    price: int
    category: str
    image: str
    is_veg: bool
    is_available: bool = True