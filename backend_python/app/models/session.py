from sqlalchemy import Column, Integer, String, DateTime, Numeric, Enum, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class SessionStatus(str, enum.Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    NO_SHOW = "NO_SHOW"

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, unique=True, index=True, nullable=False)
    mentor_address = Column(String, ForeignKey("users.wallet_address"), nullable=False)
    mentee_address = Column(String, ForeignKey("users.wallet_address"), nullable=False)
    price = Column(Numeric(10, 2), nullable=True)
    status = Column(Enum(SessionStatus), default=SessionStatus.PENDING)
    scheduled_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    duration = Column(Integer, nullable=True)  # in minutes
    notes = Column(String, nullable=True)
    rating = Column(Integer, nullable=True)  # 1-5 stars
    review = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    mentor = relationship("User", back_populates="mentor_sessions", foreign_keys=[mentor_address])
    mentee = relationship("User", back_populates="mentee_sessions", foreign_keys=[mentee_address])
    payments = relationship("Payment", back_populates="session")
