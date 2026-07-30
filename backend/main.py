from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload import router
from routes.analyze import router as analyze_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(analyze_router)

@app.get("/")
def root():
    return {"message": "Hello from FastAPI!"}