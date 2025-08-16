from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_payments():
    """Get all payments (placeholder)"""
    return {"message": "Payments endpoint - to be implemented"}
