from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from models.order import Order, OrderCreate, OrderItem
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/orders", tags=["orders"])

def set_db(database: AsyncIOMotorDatabase):
    global db
    db = database

@router.post("", response_model=Order)
async def create_order(order_input: OrderCreate):
    """Create a new order"""
    try:
        # Calculate totals
        subtotal = sum(item.price * item.quantity for item in order_input.items)
        delivery_charge = 30 if order_input.delivery_type == "delivery" else 0
        total = subtotal + delivery_charge
        
        # Create order object
        order_dict = order_input.dict()
        order = Order(
            **order_dict,
            subtotal=subtotal,
            delivery_charge=delivery_charge,
            total=total
        )
        
        # Insert into database
        result = await db.orders.insert_one(order.dict())
        
        logger.info(f"Order created: {order.order_id}")
        return order
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create order")

@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get order by ID"""
    try:
        order = await db.orders.find_one({"order_id": order_id})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return Order(**order)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching order: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch order")

@router.get("", response_model=List[Order])
async def get_orders(status: Optional[str] = None, limit: int = 50, offset: int = 0):
    """Get all orders with optional filtering"""
    try:
        query = {}
        if status:
            query["order_status"] = status
        
        orders = await db.orders.find(query).sort("created_at", -1).skip(offset).limit(limit).to_list(limit)
        return [Order(**order) for order in orders]
    except Exception as e:
        logger.error(f"Error fetching orders: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch orders")