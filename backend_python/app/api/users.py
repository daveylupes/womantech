from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User, UserRole
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from typing import List, Optional

router = APIRouter()

@router.post("/register")
async def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    existing_user = db.query(User).filter(
        User.wallet_address == user_data.wallet_address
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this wallet address already exists"
        )
    
    # Create new user
    import json
    skills_json = json.dumps(user_data.skills or [])
    
    db_user = User(
        wallet_address=user_data.wallet_address,
        name=user_data.name,
        email=user_data.email,
        role=user_data.role,
        bio=user_data.bio,
        skills=skills_json,
        experience=user_data.experience,
        hourly_rate=user_data.hourly_rate
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Convert skills back to list for response
    response_data = {
        "id": db_user.id,
        "wallet_address": db_user.wallet_address,
        "name": db_user.name,
        "email": db_user.email,
        "role": db_user.role,
        "reputation": db_user.reputation,
        "subscription_tier": db_user.subscription_tier,
        "subscription_expiry": db_user.subscription_expiry,
        "bio": db_user.bio,
        "skills": json.loads(db_user.skills) if db_user.skills else [],
        "experience": db_user.experience,
        "hourly_rate": db_user.hourly_rate,
        "profile_image": db_user.profile_image,
        "is_verified": db_user.is_verified,
        "is_active": db_user.is_active,
        "last_active_at": db_user.last_active_at,
        "created_at": db_user.created_at,
        "updated_at": db_user.updated_at,
    }
    
    return response_data

@router.get("/me", response_model=UserResponse)
async def get_current_user(db: Session = Depends(get_db)):
    """Get current user (placeholder - needs authentication)"""
    # TODO: Implement authentication
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Authentication not implemented yet"
    )

@router.get("/search")
async def search_users(
    role: Optional[UserRole] = None,
    skills: Optional[str] = None,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Search users by criteria"""
    query = db.query(User).filter(User.is_active == True)
    
    if role:
        query = query.filter(User.role == role)
    
    if skills:
        # Simple search - in production you'd want more sophisticated search
        import json
        query = query.filter(User.skills.contains(json.dumps([skills])))
    
    users = query.limit(limit).all()
    
    # Convert skills back to list for response
    import json
    response_users = []
    for user in users:
        response_data = {
            "id": user.id,
            "wallet_address": user.wallet_address,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "reputation": user.reputation,
            "subscription_tier": user.subscription_tier,
            "subscription_expiry": user.subscription_expiry,
            "bio": user.bio,
            "skills": json.loads(user.skills) if user.skills else [],
            "experience": user.experience,
            "hourly_rate": user.hourly_rate,
            "profile_image": user.profile_image,
            "is_verified": user.is_verified,
            "is_active": user.is_active,
            "last_active_at": user.last_active_at,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
        }
        response_users.append(response_data)
    
    return response_users

@router.get("/{wallet_address}")
async def get_user_by_address(wallet_address: str, db: Session = Depends(get_db)):
    """Get user by wallet address"""
    user = db.query(User).filter(
        User.wallet_address == wallet_address,
        User.is_active == True
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Convert skills back to list for response
    import json
    response_data = {
        "id": user.id,
        "wallet_address": user.wallet_address,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "reputation": user.reputation,
        "subscription_tier": user.subscription_tier,
        "subscription_expiry": user.subscription_expiry,
        "bio": user.bio,
        "skills": json.loads(user.skills) if user.skills else [],
        "experience": user.experience,
        "hourly_rate": user.hourly_rate,
        "profile_image": user.profile_image,
        "is_verified": user.is_verified,
        "is_active": user.is_active,
        "last_active_at": user.last_active_at,
        "created_at": user.created_at,
        "updated_at": user.updated_at,
    }
    
    return response_data
