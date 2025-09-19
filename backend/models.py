from fastapi import FastAPI, Depends
from pydantic import BaseModel

class Lead(BaseModel):
    srno: str
    name : str
    email: str
    phone: str
    leadSource: str
    stage: str
    nextStep: str
    status: str
    city: str
    state: str
    zipcode: str
    course: str
    followupdate: str
    followuptime: str
    price: str
        
class Signup(BaseModel):
    username: str
    email: str
    password: str
    
class LoginRequest(BaseModel):
    email: str
    password: str
    
class UserResponse(BaseModel):
    username: str
    email: str
