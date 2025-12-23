# Seed data for menu items based on mock.js

menu_seed_data = [
    # Tandoori Momos
    {
        "item_id": 101,
        "name": "Veg Tandoori Momos",
        "description": "Crispy grilled momos with mixed vegetables",
        "price": 80,
        "category": "Tandoori Momos",
        "is_veg": True,
        "image": "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9",
        "is_available": True
    },
    {
        "item_id": 102,
        "name": "Chicken Tandoori Momos",
        "description": "Juicy chicken momos with tandoori spices",
        "price": 120,
        "category": "Tandoori Momos",
        "is_veg": False,
        "image": "https://images.unsplash.com/photo-1694923450868-b432a8ee52aa",
        "is_available": True
    },
    {
        "item_id": 103,
        "name": "Paneer Tandoori Momos",
        "description": "Cottage cheese filled momos with tandoori coating",
        "price": 100,
        "category": "Tandoori Momos",
        "is_veg": True,
        "image": "https://images.unsplash.com/photo-1738608084602-f9543952188e",
        "is_available": True
    },
    # Afghani Momos
    {
        "item_id": 201,
        "name": "Veg Afghani Momos",
        "description": "Momos tossed in creamy afghani sauce",
        "price": 90,
        "category": "Afghani Momos",
        "is_veg": True,
        "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
        "is_available": True
    },
    {
        "item_id": 202,
        "name": "Chicken Afghani Momos",
        "description": "Tender chicken momos in white creamy sauce",
        "price": 130,
        "category": "Afghani Momos",
        "is_veg": False,
        "image": "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg",
        "is_available": True
    },
    # Chilli Momos
    {
        "item_id": 301,
        "name": "Veg Chilli Momos",
        "description": "Spicy momos with bell peppers and onions",
        "price": 85,
        "category": "Chilli Momos",
        "is_veg": True,
        "image": "https://images.pexels.com/photos/3911228/pexels-photo-3911228.jpeg",
        "is_available": True
    },
    {
        "item_id": 302,
        "name": "Chicken Chilli Momos",
        "description": "Fiery chicken momos in spicy sauce",
        "price": 125,
        "category": "Chilli Momos",
        "is_veg": False,
        "image": "https://images.unsplash.com/photo-1589047133481-02b4a5327d89",
        "is_available": True
    },
    {
        "item_id": 303,
        "name": "Paneer Chilli Momos",
        "description": "Cottage cheese momos with spicy gravy",
        "price": 95,
        "category": "Chilli Momos",
        "is_veg": True,
        "image": "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e",
        "is_available": True
    },
    # Steamed Momos
    {
        "item_id": 401,
        "name": "Veg Steamed Momos",
        "description": "Classic steamed momos with vegetables",
        "price": 60,
        "category": "Steamed Momos",
        "is_veg": True,
        "image": "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e",
        "is_available": True
    },
    {
        "item_id": 402,
        "name": "Chicken Steamed Momos",
        "description": "Traditional chicken momos steamed to perfection",
        "price": 100,
        "category": "Steamed Momos",
        "is_veg": False,
        "image": "https://images.unsplash.com/photo-1694923450868-b432a8ee52aa",
        "is_available": True
    },
    {
        "item_id": 403,
        "name": "Mixed Steamed Momos",
        "description": "Combination of veg and chicken momos",
        "price": 110,
        "category": "Steamed Momos",
        "is_veg": False,
        "image": "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9",
        "is_available": True
    }
]

reviews_seed_data = [
    {
        "name": "Rahul Kumar",
        "rating": 5,
        "date": "2 weeks ago",
        "review": "Amazing taste! The tandoori momos are absolutely delicious. Crunchy coating with flavorful filling. Best momos in Bhagalpur!",
        "avatar": "RK",
        "is_approved": True
    },
    {
        "name": "Priya Singh",
        "rating": 4,
        "date": "1 month ago",
        "review": "Great value for money. The spicy fillings are perfect. Staff is very attentive and service is quick. Highly recommended!",
        "avatar": "PS",
        "is_approved": True
    },
    {
        "name": "Amit Sharma",
        "rating": 5,
        "date": "3 weeks ago",
        "review": "Authentic Delhi-style taste in Bhagalpur. The afghani momos are creamy and delicious. Will definitely come back!",
        "avatar": "AS",
        "is_approved": True
    },
    {
        "name": "Sneha Verma",
        "rating": 4,
        "date": "1 week ago",
        "review": "Loved the chilli momos! Spicy and tangy just the way I like it. Good hygiene and friendly staff.",
        "avatar": "SV",
        "is_approved": True
    }
]

async def seed_database(db):
    """Seed the database with initial data"""
    # Clear existing data
    await db.menu_items.delete_many({})
    await db.reviews.delete_many({})
    
    # Insert menu items
    if menu_seed_data:
        await db.menu_items.insert_many(menu_seed_data)
        print(f"Seeded {len(menu_seed_data)} menu items")
    
    # Insert reviews
    if reviews_seed_data:
        await db.reviews.insert_many(reviews_seed_data)
        print(f"Seeded {len(reviews_seed_data)} reviews")
    
    print("Database seeding completed!")