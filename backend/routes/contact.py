from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List
from models.contact import ContactMessage, ContactMessageCreate
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/contact", tags=["contact"])

def set_db(database: AsyncIOMotorDatabase):
    global db
    db = database

@router.post("", response_model=ContactMessage)
async def create_contact_message(message_input: ContactMessageCreate):
    """Submit a contact form message"""
    try:
        message = ContactMessage(**message_input.dict())
        await db.contact_messages.insert_one(message.dict())
        
        logger.info(f"Contact message received from {message.name}")
        return message
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit message")

@router.get("/messages", response_model=List[ContactMessage])
async def get_contact_messages(limit: int = 50, offset: int = 0):
    """Get all contact messages (admin functionality)"""
    try:
        messages = await db.contact_messages.find().sort("created_at", -1).skip(offset).limit(limit).to_list(limit)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")