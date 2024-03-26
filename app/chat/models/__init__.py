from pydantic import BaseModel


class Metadata(BaseModel):
    conversation_id: str
    user_id: str
    doc_id: str


class ChatArgs(BaseModel):
    conversation_id: str
    doc_id: str
    metadata: Metadata
