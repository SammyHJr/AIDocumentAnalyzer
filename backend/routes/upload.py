from fastapi import APIRouter, UploadFile, File
from services.pdf_service import extract_text

router = APIRouter()

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    text = extract_text(file.file)
    print(file.filename)

    return {
        "filename": file.filename,
        "text": text
    }