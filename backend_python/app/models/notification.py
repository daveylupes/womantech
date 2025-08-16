from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, Boolean, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class NotificationType(str, enum.Enum):
    SESSION_REQUEST = "SESSION_REQUEST"
    SESSION_CONFIRMED = "SESSION_CONFIRMED"
    SESSION_CANCELLED = "SESSION_CANCELLED"
    PAYMENT_RECEIVED = "PAYMENT_RECEIVED"
    REPUTATION_UPDATED = "REPUTATION_UPDATED"
    SYSTEM_MESSAGE = "SYSTEM_MESSAGE"

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(Enum(NotificationType), nullable=False)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    data = Column(JSON, nullable=True)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="notifications")
