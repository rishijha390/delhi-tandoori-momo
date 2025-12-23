from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class OrderItem(BaseModel):
    item_id: int
    name: str
    price: int
    quantity: int

class Order(BaseModel):
    order_id: str = Field(default_factory=lambda: f"ORD{str(uuid.uuid4())[:8].upper()}")
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    delivery_address: Optional[str] = None
    delivery_type: str
    items: List[OrderItem]
    subtotal: int
    delivery_charge: int
    total: int
    payment_method: str
    payment_status: str = "pending"
    order_status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    delivery_address: Optional[str] = None
    delivery_type: str
    items: List[OrderItem]
    payment_method: str