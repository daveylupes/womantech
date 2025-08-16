#!/usr/bin/env python3
"""
Demo Data Script for WomanTech Connect MVP
Creates sample mentees and mentors with realistic profiles
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import SessionLocal, engine
from app.models.user import User, UserRole, SubscriptionTier
from app.models.session import Session, SessionStatus
from app.models.payment import Payment, PaymentStatus
from app.models.notification import Notification, NotificationType
from app.models.message import Message
import json
from datetime import datetime, timedelta
import random

def create_demo_users():
    """Create demo mentees and mentors"""
    
    demo_users = [
        # Mentors
        {
            "wallet_address": "0x1234567890123456789012345678901234567890",
            "name": "Precious Malope",
            "email": "precious.malope@tech.com",
            "role": UserRole.MENTOR,
            "reputation": 95,
            "subscription_tier": SubscriptionTier.PREMIUM,
            "bio": "Senior Software Engineer at Google with 8+ years of experience in full-stack development. Passionate about mentoring women in tech and helping them break into the industry.",
            "skills": ["JavaScript", "React", "Node.js", "Python", "AWS", "System Design"],
            "experience": "8+ years in software engineering",
            "hourly_rate": 150.00,
            "is_verified": True,
            "is_active": True
        },
        {
            "wallet_address": "0x2345678901234567890123456789012345678901",
            "name": "Rachel Konuto",
            "email": "rachel.konuto@blockchain.com",
            "role": UserRole.MENTOR,
            "reputation": 88,
            "subscription_tier": SubscriptionTier.PREMIUM,
            "bio": "Blockchain developer and DeFi expert. Former senior developer at Coinbase. Love teaching smart contract development and Web3 concepts.",
            "skills": ["Solidity", "Ethereum", "DeFi", "Smart Contracts", "Rust", "Web3"],
            "experience": "6+ years in blockchain development",
            "hourly_rate": 180.00,
            "is_verified": True,
            "is_active": True
        },
        {
            "wallet_address": "0x3456789012345678901234567890123456789012",
            "name": "Jeremy Powell",
            "email": "jeremy.powell@ai.com",
            "role": UserRole.MENTOR,
            "reputation": 92,
            "subscription_tier": SubscriptionTier.PREMIUM,
            "bio": "Machine Learning Engineer at OpenAI. PhD in Computer Science from Stanford. Expert in AI/ML, deep learning, and data science.",
            "skills": ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "NLP"],
            "experience": "10+ years in AI/ML",
            "hourly_rate": 200.00,
            "is_verified": True,
            "is_active": True
        },
        {
            "wallet_address": "0x4567890123456789012345678901234567890123",
            "name": "Donald Trump",
            "email": "donald.trump@startup.com",
            "role": UserRole.MENTOR,
            "reputation": 85,
            "subscription_tier": SubscriptionTier.BASIC,
            "bio": "Product Manager and startup founder. Successfully built and sold 2 tech startups. Expert in product strategy, user research, and growth.",
            "skills": ["Product Management", "User Research", "Growth Hacking", "Startup Strategy", "UX Design"],
            "experience": "7+ years in product management",
            "hourly_rate": 120.00,
            "is_verified": True,
            "is_active": True
        },
        {
            "wallet_address": "0x5678901234567890123456789012345678901234",
            "name": "Aisha Patel",
            "email": "aisha.patel@microsoft.com",
            "role": UserRole.MENTOR,
            "reputation": 89,
            "subscription_tier": SubscriptionTier.PREMIUM,
            "bio": "Cloud Solutions Architect at Microsoft. Expert in Azure, DevOps, and enterprise architecture. Love helping others understand cloud technologies.",
            "skills": ["Azure", "DevOps", "Docker", "Kubernetes", "Terraform", "CI/CD"],
            "experience": "9+ years in cloud architecture",
            "hourly_rate": 160.00,
            "is_verified": True,
            "is_active": True
        },
        {
            "wallet_address": "0x6789012345678901234567890123456789012345",
            "name": "Marcus Johnson",
            "email": "marcus.johnson@netflix.com",
            "role": UserRole.MENTOR,
            "reputation": 91,
            "subscription_tier": SubscriptionTier.PREMIUM,
            "bio": "Senior Data Engineer at Netflix. Expert in big data, streaming platforms, and distributed systems. Passionate about data engineering and mentorship.",
            "skills": ["Apache Spark", "Kafka", "Hadoop", "Scala", "Java", "Data Engineering"],
            "experience": "11+ years in data engineering",
            "hourly_rate": 175.00,
            "is_verified": True,
            "is_active": True
        },
        
        # Mentees
        {
            "wallet_address": "0x7890123456789012345678901234567890123456",
            "name": "Zara Ahmed",
            "email": "zara.ahmed@student.com",
            "role": UserRole.MENTEE,
            "reputation": 15,
            "subscription_tier": SubscriptionTier.FREE,
            "bio": "Computer Science student at MIT. Passionate about web development and looking to break into the tech industry.",
            "skills": ["JavaScript", "HTML", "CSS", "React"],
            "experience": "Student with 2 years of coding experience",
            "hourly_rate": None,
            "is_verified": False,
            "is_active": True
        },
        {
            "wallet_address": "0x8901234567890123456789012345678901234567",
            "name": "Sofia Rodriguez",
            "email": "sofia.rodriguez@career.com",
            "role": UserRole.MENTEE,
            "reputation": 8,
            "subscription_tier": SubscriptionTier.FREE,
            "bio": "Career switcher from finance to tech. Learning full-stack development and looking for guidance on the transition.",
            "skills": ["HTML", "CSS", "JavaScript", "Finance"],
            "experience": "4 years in finance, 1 year learning to code",
            "hourly_rate": None,
            "is_verified": False,
            "is_active": True
        },
        {
            "wallet_address": "0x9012345678901234567890123456789012345678",
            "name": "Kai Chen",
            "email": "kai.chen@junior.com",
            "role": UserRole.MENTEE,
            "reputation": 25,
            "subscription_tier": SubscriptionTier.BASIC,
            "bio": "Junior developer at a startup. Looking to improve my skills and advance my career in software engineering.",
            "skills": ["Python", "Django", "PostgreSQL", "Docker"],
            "experience": "2 years as a junior developer",
            "hourly_rate": None,
            "is_verified": True,
            "is_active": True
        },
        {
            "wallet_address": "0xA123456789012345678901234567890123456789",
            "name": "Fatima Al-Zahra",
            "email": "fatima.alzahra@blockchain.com",
            "role": UserRole.MENTEE,
            "reputation": 12,
            "subscription_tier": SubscriptionTier.FREE,
            "bio": "Interested in blockchain and Web3 development. Learning Solidity and looking for mentorship in the crypto space.",
            "skills": ["JavaScript", "Solidity", "Web3"],
            "experience": "1 year learning blockchain development",
            "hourly_rate": None,
            "is_verified": False,
            "is_active": True
        },
        {
            "wallet_address": "0xB123456789012345678901234567890123456789",
            "name": "Liam O'Connor",
            "email": "liam.oconnor@student.com",
            "role": UserRole.MENTEE,
            "reputation": 18,
            "subscription_tier": SubscriptionTier.FREE,
            "bio": "Computer Science student at Stanford. Focused on machine learning and AI. Looking for mentorship in the field.",
            "skills": ["Python", "Machine Learning", "Statistics", "R"],
            "experience": "Student with 3 years of coding experience",
            "hourly_rate": None,
            "is_verified": False,
            "is_active": True
        },
        {
            "wallet_address": "0xC123456789012345678901234567890123456789",
            "name": "Yuki Tanaka",
            "email": "yuki.tanaka@junior.com",
            "role": UserRole.MENTEE,
            "reputation": 22,
            "subscription_tier": SubscriptionTier.BASIC,
            "bio": "Frontend developer at a gaming company. Passionate about creating beautiful user interfaces and learning new technologies.",
            "skills": ["React", "TypeScript", "Three.js", "Game Development"],
            "experience": "3 years in frontend development",
            "hourly_rate": None,
            "is_verified": True,
            "is_active": True
        }
    ]
    
    db = SessionLocal()
    
    try:
        # Create users
        created_users = []
        for user_data in demo_users:
            # Check if user already exists
            existing_user = db.query(User).filter(
                User.wallet_address == user_data["wallet_address"]
            ).first()
            
            if existing_user:
                print(f"User {user_data['name']} already exists, skipping...")
                created_users.append(existing_user)
                continue
            
            # Create new user
            user = User(
                wallet_address=user_data["wallet_address"],
                name=user_data["name"],
                email=user_data["email"],
                role=user_data["role"],
                reputation=user_data["reputation"],
                subscription_tier=user_data["subscription_tier"],
                bio=user_data["bio"],
                skills=json.dumps(user_data["skills"]),
                experience=user_data["experience"],
                hourly_rate=user_data["hourly_rate"],
                is_verified=user_data["is_verified"],
                is_active=user_data["is_active"]
            )
            
            db.add(user)
            created_users.append(user)
            print(f"Created user: {user_data['name']} ({user_data['role'].value})")
        
        db.commit()
        print(f"\n✅ Created {len(created_users)} demo users")
        return created_users
        
    except Exception as e:
        db.rollback()
        print(f"Error creating demo users: {e}")
        raise
    finally:
        db.close()

def create_demo_sessions():
    """Create demo mentorship sessions"""
    
    db = SessionLocal()
    
    try:
        # Get some users for sessions
        mentors = db.query(User).filter(User.role == UserRole.MENTOR).limit(3).all()
        mentees = db.query(User).filter(User.role == UserRole.MENTEE).limit(3).all()
        
        if not mentors or not mentees:
            print("Need both mentors and mentees to create sessions")
            return
        
        # Create sessions with available users
        demo_sessions = []
        
        if len(mentors) >= 1 and len(mentees) >= 1:
            demo_sessions.append({
                "session_id": "SESS_001",
                "mentor_address": mentors[0].wallet_address,
                "mentee_address": mentees[0].wallet_address,
                "price": 150.00,
                "status": SessionStatus.COMPLETED,
                "scheduled_at": datetime.now() - timedelta(days=2),
                "completed_at": datetime.now() - timedelta(days=2, hours=1),
                "duration": 60,
                "notes": "Great session on React fundamentals and best practices. Emily showed good understanding of component lifecycle.",
                "rating": 5,
                "review": "Sarah was amazing! She explained complex concepts in a simple way and gave me practical tips for my project."
            })
        
        if len(mentors) >= 2 and len(mentees) >= 2:
            demo_sessions.append({
                "session_id": "SESS_002",
                "mentor_address": mentors[1].wallet_address,
                "mentee_address": mentees[1].wallet_address,
                "price": 180.00,
                "status": SessionStatus.CONFIRMED,
                "scheduled_at": datetime.now() + timedelta(days=1),
                "duration": 90,
                "notes": "Blockchain development session focusing on Solidity smart contracts and DeFi protocols."
            })
        
        if len(mentors) >= 3 and len(mentees) >= 3:
            demo_sessions.append({
                "session_id": "SESS_003",
                "mentor_address": mentors[2].wallet_address,
                "mentee_address": mentees[2].wallet_address,
                "price": 200.00,
                "status": SessionStatus.PENDING,
                "scheduled_at": datetime.now() + timedelta(days=3),
                "duration": 60,
                "notes": "Machine learning session to help Lisa improve her ML skills for her current project."
            })
        
        created_sessions = []
        for session_data in demo_sessions:
            # Check if session already exists
            existing_session = db.query(Session).filter(
                Session.session_id == session_data["session_id"]
            ).first()
            
            if existing_session:
                print(f"Session {session_data['session_id']} already exists, skipping...")
                created_sessions.append(existing_session)
                continue
            
            session = Session(**session_data)
            db.add(session)
            created_sessions.append(session)
            print(f"Created session: {session_data['session_id']} - {session_data['status'].value}")
        
        db.commit()
        print(f"\n✅ Created {len(created_sessions)} demo sessions")
        return created_sessions
        
    except Exception as e:
        db.rollback()
        print(f"Error creating demo sessions: {e}")
        raise
    finally:
        db.close()

def create_demo_notifications():
    """Create demo notifications"""
    
    db = SessionLocal()
    
    try:
        users = db.query(User).limit(5).all()
        
        demo_notifications = [
            {
                "user_id": users[0].id,
                "type": NotificationType.SESSION_CONFIRMED,
                "title": "Session Confirmed",
                "message": "Your session with Maria Rodriguez has been confirmed for tomorrow at 2:00 PM.",
                "data": {"session_id": "SESS_002"}
            },
            {
                "user_id": users[1].id,
                "type": NotificationType.REPUTATION_UPDATED,
                "title": "Reputation Updated",
                "message": "You gained 5 reputation points from your recent session!",
                "data": {"points": 5, "reason": "session_completion"}
            },
            {
                "user_id": users[2].id,
                "type": NotificationType.SYSTEM_MESSAGE,
                "title": "Welcome to WomanTech Connect!",
                "message": "We're excited to have you join our community. Start by completing your profile!",
                "data": {"action": "complete_profile"}
            }
        ]
        
        created_notifications = []
        for notif_data in demo_notifications:
            notification = Notification(**notif_data)
            db.add(notification)
            created_notifications.append(notification)
            print(f"Created notification: {notif_data['title']}")
        
        db.commit()
        print(f"\n✅ Created {len(created_notifications)} demo notifications")
        return created_notifications
        
    except Exception as e:
        db.rollback()
        print(f"Error creating demo notifications: {e}")
        raise
    finally:
        db.close()

def main():
    """Main function to create all demo data"""
    print("🚀 Creating WomanTech Connect Demo Data...\n")
    
    try:
        # Create demo users
        users = create_demo_users()
        
        # Create demo sessions
        sessions = create_demo_sessions()
        
        # Create demo notifications
        notifications = create_demo_notifications()
        
        print("\n🎉 Demo data creation completed successfully!")
        print(f"📊 Summary:")
        print(f"   - {len(users)} users created")
        print(f"   - {len(sessions)} sessions created")
        print(f"   - {len(notifications)} notifications created")
        print("\n✨ Your WomanTech Connect MVP is ready!")
        
    except Exception as e:
        print(f"❌ Error creating demo data: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
