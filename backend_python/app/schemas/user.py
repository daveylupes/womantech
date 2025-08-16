from pydantic import BaseModel, EmailStr
from typing import Optional, List
from decimal import Decimal
from datetime import datetime
from app.models.user import UserRole, SubscriptionTier

class UserBase(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    role: UserRole
    bio: Optional[str] = None
    skills: Optional[List[str]] = None
    experience: Optional[str] = None
    hourly_rate: Optional[Decimal] = None

    class Config:
        from_attributes = True

class UserCreate(UserBase):
    wallet_address: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    bio: Optional[str] = None
    skills: Optional[List[str]] = None
    experience: Optional[str] = None
    hourly_rate: Optional[Decimal] = None
    profile_image: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    wallet_address: str
    name: str
    email: Optional[EmailStr] = None
    role: UserRole
    reputation: int
    subscription_tier: SubscriptionTier
    subscription_expiry: Optional[datetime] = None
    bio: Optional[str] = None
    skills: List[str] = []
    experience: Optional[str] = None
    hourly_rate: Optional[Decimal] = None
    profile_image: Optional[str] = None
    is_verified: bool
    is_active: bool
    last_active_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
