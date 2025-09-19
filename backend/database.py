from models import Lead, Signup, LoginRequest, UserResponse
from bson.objectid import ObjectId
# from passlib.context import CryptContext
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.LifeStreamDB
lead_collection = database["lead"]
contact_collection = database["contact"]
deal_collection = database["deals"]
users_collection = database["users"]


async def logindb(user):
    existing_user = await users_collection.find_one({"email": user["email"]})
    if not existing_user:
        return None
    return existing_user

async def signupdb(user):
    print(user['email'])
    try:
        # Ensure email is unique
        existing_user = await users_collection.find_one({"email": user["email"]})
        print(existing_user)
        if existing_user:
            return None  # User already exists

        # Insert the new user
        result = await users_collection.insert_one(user)
        
        # Fetch inserted user data (excluding ObjectId)
        inserted_user = await users_collection.find_one({"_id": result.inserted_id}, {"_id": 0})
        
        return inserted_user
    except Exception as e:
        print(f"Error in signup: {e}")
        return None

# Leads
async def create_lead(lead):
    document = lead
    result = await lead_collection.insert_one(document)
    created_lead = await lead_collection.find_one({"_id": result.inserted_id})
    return created_lead 

async def fetch_lead():
    leads = []
    cursor = lead_collection.find({})
    async for document in cursor:
        document["_id"] = str(document["_id"])  # Convert ObjectId to string
        leads.append(document)  # Append full document
    return leads

async def update_lead(name: str, new_data: dict):
    result = await lead_collection.update_one(
        {"name": name},  # Find by name
        {"$set": new_data}  # Update fields
    )

    if result.matched_count == 0:  # No match found
        return None

    updated_lead = await lead_collection.find_one({"name": name})

    return updated_lead

async def delete_lead(name):
    await lead_collection.delete_one({"name":name})
    return True
