from typing import Optional
from pydantic import BaseModel


class MessageModel(BaseModel):
    id: Optional[int]
    conversation_id: str
    role: str
    content: str
    created_at: Optional[str]
