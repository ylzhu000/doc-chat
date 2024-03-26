import os
from supabase import create_client
from langchain.schema.messages import AIMessage, HumanMessage, SystemMessage
from typing import List

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def get_supbase_client():
    return supabase


def get_files(bucket_name: str, path: str):
    files = supabase.storage.from_(bucket_name).list(path)
    return files


def upload_file_to_supabase(path, file_content, content_type="application/pdf"):
    supabase.storage.from_(os.getenv("SUPABASE_BUCKET_NAME")).upload(path=path, file=file_content,
                                                                     file_options={
                                                                         "content-type": content_type})


def get_public_url(path):
    public_url = supabase.storage.from_(os.getenv("SUPABASE_BUCKET_NAME")).get_public_url(path)
    return public_url


def get_messages_by_conversation_id(conversation_id: str) -> List[HumanMessage | AIMessage | SystemMessage]:
    print(f"Fetching messages for conversation_id: {conversation_id}")
    rows = supabase.table("message").select("*").eq("conversation_id", conversation_id).order("created_at",
                                                                                              desc=True).execute()
    messages = []
    for row in rows.data:
        role = row["role"]
        content = row["content"]
        if role == 'human':
            messages.append(HumanMessage(content=content))
        elif role == 'ai':
            messages.append(AIMessage(content=content))
        elif role == 'system':
            messages.append(SystemMessage(content=content))
        else:
            Exception(f"Unknown message role : {role}")

    return messages


def add_message_to_conversation(conversation_id: str, role: str, content: str):
    supabase.table("message").insert({"conversation_id": conversation_id, "role": role, "content": content}).execute()


def get_document_id_from_conversation_id(conversation_id: str):
    rows = supabase.table("conversation").select("document_id").eq("id", conversation_id).execute()
    document_id = rows.data[0]["document_id"]
    return document_id
