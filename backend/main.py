from fastapi import FastAPI, HTTPException,Response
from fastapi.middleware.cors import CORSMiddleware
from models import Lead, Signup, LoginRequest, UserResponse
# import motor.motor_asyncio
from database import (
    create_lead, fetch_lead, update_lead, delete_lead, logindb, signupdb
)

app = FastAPI()
users_db = {
    "testuser": {"email": "test@example.com", "password": "$2b$12$EIXdA8xQIrYZBz4xQ..."}  # Hashed password
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000","*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to LifeStream API"}

# SIGNUP
@app.post("/signup", response_model=Signup)
async def signup(user: Signup):
    # print(user)
    user_data = user.model_dump()
    print(user_data)
    response = await signupdb(user_data)
    if not response:
        raise HTTPException(status_code=500, detail="Failed to add user")
    return response

# LOGIN
@app.post("/login")
async def login(user: LoginRequest):
    existing_user = await logindb(user.model_dump())  # Fetch user from database

    if not existing_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if user.password != existing_user["password"]:  # Simple password check
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful", "username": existing_user["username"], "email": existing_user["email"]}


# Leads
# @app.post("/add", response_model=Lead)
@app.post("/add")
async def add_lead(lead: Lead):
    # print(lead)
    response = await create_lead(lead.model_dump())
    if not response:
        raise HTTPException(status_code=500, detail="Failed to create lead")
    return lead

@app.get("/get")
async def get_leads():
    response = await fetch_lead()
    if not response:
        raise HTTPException(status_code=404, detail="No leads found")
    return response

@app.put("/update/{name}/", response_model=Lead)
async def update_lead_route(name: str, lead: Lead):
    updated_lead = await update_lead(name, lead.model_dump())
    if not updated_lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return updated_lead

@app.delete("/delete")
async def remove_lead(name: str):
    response = await delete_lead(name)
    if not response:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead deleted successfully"}
