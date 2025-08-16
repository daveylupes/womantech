from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_sessions():
    """Get all sessions (placeholder)"""
    return {"message": "Sessions endpoint - to be implemented"}
