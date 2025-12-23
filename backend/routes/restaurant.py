from fastapi import APIRouter
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/restaurant", tags=["restaurant"])

@router.get("/info")
async def get_restaurant_info():
    """Get restaurant information"""
    return {
        "name": "दिल्ली तंदूरी मोमो",
        "englishName": "Delhi Tandoori Momo",
        "tagline": "Authentic Delhi-Style Tandoori Momos in Bhagalpur",
        "rating": 4.5,
        "totalReviews": 104,
        "priceRange": "₹1–200 per person",
        "phone": "8873652662",
        "businessPhone": "079790 16236",
        "address": "Zila School Rd, Adampur, Bhagalpur, Bihar – 812001",
        "location": "Nagarmal Sheonarain and Sons, Bhagalpur",
        "plusCode": "7X2H+44 Bhagalpur, Bihar",
        "timings": "Open daily, closes at 10:30 PM",
        "services": ["Dine-in", "Takeaway", "Delivery", "Online Ordering"],
        "socialMedia": {
            "whatsapp": "8873652662",
            "instagram": "rishijha390",
            "facebook": "#"
        },
        "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.8!2d87.32!3d25.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE1JzAwLjAiTiA4N8KwMTknMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
    }