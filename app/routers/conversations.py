import os
from fastapi import APIRouter, Depends, HTTPException
from ..services.supabase_service import get_supbase_client, get_document_id_from_conversation_id
from ..dependencies.auth_dependencies import verify_auth_token
from ..chat.models import ChatArgs
from ..chat import build_chat
from ..models.conversation import ConversationInput

router = APIRouter(prefix=f"/api/{os.getenv('API_VERSION')}/conversations", tags=["conversation"])


@router.get("/{document_id}")
def get_conversations(document_id, user_id: str = Depends(verify_auth_token)):
    supabase = get_supbase_client()
    # Fetch all the conversations based on corresponding document_id
    rows = supabase.table("conversation").select("*", count="exact").eq("document_id", document_id).execute()

    if rows.count == 0:
        new_rows = supabase.table("conversation").insert(
            {"user_id": user_id, "document_id": document_id}).execute()
        return new_rows

    return rows


@router.post("/{conversation_id}/messages")
def create_message(conversation_id: str, payload: ConversationInput, user_id: str = Depends(verify_auth_token)):
    document_id = get_document_id_from_conversation_id(conversation_id)
    chat_args = ChatArgs(
        conversation_id=conversation_id,
        doc_id=document_id,
        metadata={
            "conversation_id": conversation_id,
            "user_id": user_id,
            "doc_id": document_id,
        },
    )

    chat = build_chat(chat_args)

    if not chat:
        raise HTTPException(status_code=500, detail="Error when building the chat instance")
    else:
        return {"role": "assistant", "content": chat.run(payload.message)}


@router.post("/conversations/", tags=["conversation"])
def save_conversations():
    pass
