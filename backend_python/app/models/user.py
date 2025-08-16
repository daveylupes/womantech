from sqlalchemy import Column, Integer, String, Boolean, DateTime, Numeric, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class UserRole(str, enum.Enum):
    MENTOR = "MENTOR"
    MENTEE = "MENTEE"
    ADMIN = "ADMIN"

class SubscriptionTier(str, enum.Enum):
    FREE = "FREE"
    BASIC = "BASIC"
    PREMIUM = "PREMIUM"
    ENTERPRISE = "ENTERPRISE"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    wallet_address = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    role = Column(Enum(UserRole), nullable=False)
    reputation = Column(Integer, default=0)
    subscription_tier = Column(Enum(SubscriptionTier), default=SubscriptionTier.FREE)
    subscription_expiry = Column(DateTime, nullable=True)
    bio = Column(String, nullable=True)
    skills = Column(String, default="[]")  # Store as JSON string for SQLite compatibility
    experience = Column(String, nullable=True)
    hourly_rate = Column(Numeric(10, 2), nullable=True)
    profile_image = Column(String, nullable=True)
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    last_active_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    mentor_sessions = relationship("Session", back_populates="mentor", foreign_keys="Session.mentor_address")
    mentee_sessions = relationship("Session", back_populates="mentee", foreign_keys="Session.mentee_address")
    payments = relationship("Payment", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
    sent_messages = relationship("Message", back_populates="sender", foreign_keys="Message.sender_id")
    received_messages = relationship("Message", back_populates="receiver", foreign_keys="Message.receiver_id")
