from fastapi import FastAPI, Depends
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from .routers import upload, documents
from .dependencies.auth_dependencies import verify_auth_token

load_dotenv(".env")

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(documents.router)


@app.get("/")
async def home():
    return {
        "message": "Hello from DocChat"
    }
