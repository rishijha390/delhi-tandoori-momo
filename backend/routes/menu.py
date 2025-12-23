from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from models.menu_item import MenuItem, MenuItemCreate
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/menu", tags=["menu"])

def set_db(database: AsyncIOMotorDatabase):
    global db
    db = database

@router.get("/categories")
async def get_menu_categories():
    """Get all menu items grouped by category"""
    try:
        menu_items = await db.menu_items.find({"is_available": True}, {"_id": 0}).to_list(1000)
        
        # Group items by category
        categories = {}
        for item in menu_items:
            category = item.get("category")
            if category not in categories:
                categories[category] = {
                    "id": len(categories) + 1,
                    "name": category,
                    "items": []
                }
            
            categories[category]["items"].append({
                "id": item["item_id"],
                "name": item["name"],
                "description": item["description"],
                "price": item["price"],
                "isVeg": item["is_veg"],
                "image": item["image"]
            })
        
        return list(categories.values())
    except Exception as e:
        logger.error(f"Error fetching menu categories: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch menu")

@router.get("/items")
async def get_menu_items(category: Optional[str] = None):
    """Get all menu items, optionally filtered by category"""
    try:
        query = {"is_available": True}
        if category:
            query["category"] = category
        
        items = await db.menu_items.find(query, {"_id": 0}).to_list(1000)
        return [{**item, "id": item["item_id"]} for item in items]
    except Exception as e:
        logger.error(f"Error fetching menu items: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch menu items")

@router.get("/item/{item_id}")
async def get_menu_item(item_id: int):
    """Get single menu item by ID"""
    try:
        item = await db.menu_items.find_one({"item_id": item_id}, {"_id": 0})
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        return {**item, "id": item["item_id"]}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching menu item: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch menu item")