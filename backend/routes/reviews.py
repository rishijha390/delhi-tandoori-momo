from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List
from models.review import Review, ReviewCreate
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/reviews", tags=["reviews"])

def set_db(database: AsyncIOMotorDatabase):
    global db
    db = database

@router.get("", response_model=List[Review])
async def get_reviews(limit: int = 10):
    """Get approved reviews"""
    try:
        reviews = await db.reviews.find({"is_approved": True}).sort("created_at", -1).limit(limit).to_list(limit)
        return [Review(**review) for review in reviews]
    except Exception as e:
        logger.error(f"Error fetching reviews: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch reviews")

@router.post("", response_model=Review)
async def create_review(review_input: ReviewCreate):
    """Submit a new review"""
    try:
        # Generate avatar initials
        name_parts = review_input.name.split()
        avatar = "".join([part[0].upper() for part in name_parts[:2]])
        
        # Format date
        date_str = "Just now"
        
        review = Review(
            **review_input.dict(),
            avatar=avatar,
            date=date_str,
            is_approved=False  # Reviews need approval
        )
        
        await db.reviews.insert_one(review.dict())
        logger.info(f"Review submitted by {review.name}")
        
        return review
    except Exception as e:
        logger.error(f"Error creating review: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit review")