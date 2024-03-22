from ..services.supabase_service import get_supbase_client
from ..dependencies.auth_dependencies import verify_auth_token
from fastapi import APIRouter, Depends

router = APIRouter()


@router.get("/conversations/{document_id}", tags=["conversation"])
def get_conversations(document_id, token: str = Depends(verify_auth_token)):
    # 1. Check whether a conversation exist based on the document id
    # 2. If don't exist, save a record and return newly created conversation id
    # 3. If exist, return all the records
    supabase = get_supbase_client()
    # Fetch all the conversations based on current document_id
    conversations = supabase.table("conversation").select("*").eq("document_id", document_id).execute()
    return conversations


@router.post("/conversations/", tags=["conversation"])
def save_conversations():
    pass
