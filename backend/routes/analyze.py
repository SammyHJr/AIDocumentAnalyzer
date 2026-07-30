from fastapi import APIRouter

router = APIRouter()

@router.post("/analyze")
async def analyzer(data: dict):
    return {
        "resume": data["resume"],
        "job_description": data["job_description"]
     }