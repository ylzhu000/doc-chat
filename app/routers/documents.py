import os
from fastapi import APIRouter, HTTPException, Depends
from ..services.supabase_service import get_supbase_client
from ..dependencies.auth_dependencies import verify_auth_token

router = APIRouter(prefix=f"/api/{os.getenv('API_VERSION')}/documents", tags=["document"])


@router.get("/")
async def get_documents(user_id: str = Depends(verify_auth_token)):
    try:
        supabase = get_supbase_client()
        files = supabase.storage.from_(os.getenv("SUPABASE_BUCKET_NAME")).list(path=f"{user_id}/")
        return files
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error when retrieving the documents")
