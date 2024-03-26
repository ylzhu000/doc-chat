from pydantic import BaseModel


class ConversationInput(BaseModel):
    message: str
