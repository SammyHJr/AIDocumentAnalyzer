from fastapi import APIRouter
from services.ai_services import analyze_resume

router = APIRouter()

@router.post("/analyze")
async def analyzer(data: dict):
    result = analyze_resume (
        data["resume"],
        data["job_description"]
    )
    
    return result
