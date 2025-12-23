from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import routes
from routes import menu, orders, reviews, contact, restaurant
from utils.seed_data import seed_database

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'restaurant_db')]

# Create the main app without a prefix
app = FastAPI(title="Delhi Tandoori Momo API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check route
@api_router.get("/")
async def root():
    return {"message": "Delhi Tandoori Momo API is running!", "status": "healthy"}

# Set database for all route modules
menu.set_db(db)
orders.set_db(db)
reviews.set_db(db)
contact.set_db(db)

# Include all routers
api_router.include_router(menu.router)
api_router.include_router(orders.router)
api_router.include_router(reviews.router)
api_router.include_router(contact.router)
api_router.include_router(restaurant.router)

# Include the API router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event - seed database
@app.on_event("startup")
async def startup_event():
    logger.info("Starting up application...")
    
    # Check if database is empty, if so, seed it
    menu_count = await db.menu_items.count_documents({})
    if menu_count == 0:
        logger.info("Database is empty. Seeding data...")
        await seed_database(db)
    else:
        logger.info(f"Database already has {menu_count} menu items")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("Shutting down application...")
    client.close()