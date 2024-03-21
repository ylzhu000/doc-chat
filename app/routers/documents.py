import os
from fastapi import APIRouter, HTTPException, Depends
from ..services.supabase_service import get_supbase_client
from ..dependencies.auth_dependencies import verify_auth_token

router = APIRouter()


@router.get("/documents/", tags=["documents"])
async def get_documents(user_id: str = Depends(verify_auth_token)):
    print(user_id)
    try:
        supabase = get_supbase_client()
        files = supabase.storage.from_(os.getenv("SUPABASE_BUCKET_NAME")).list(path=f"{user_id}/")
        return files
    except Exception as e:
        raise HTTPException(status_code=500)
