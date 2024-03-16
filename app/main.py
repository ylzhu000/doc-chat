from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from .routers import upload

load_dotenv(".env")

app = FastAPI()
app.include_router(upload.router)


@app.get("/")
def root():
    return {
        "message": "Hello from DocChat"
    }
