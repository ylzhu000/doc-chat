from pydantic import BaseModel
from langchain_core.messages import BaseMessage
from typing import List
from langchain.memory import ConversationBufferMemory
from langchain.schema import BaseChatMessageHistory
from app.services.supabase_service import get_messages_by_conversation_id, add_message_to_conversation


class SupabaseMessageHistory(BaseChatMessageHistory, BaseModel):
    conversation_id: str

    @property
    def messages(self):
        return get_messages_by_conversation_id(self.conversation_id)

    def add_message(self, message) -> None:
        add_message_to_conversation(
            conversation_id=self.conversation_id,
            role=message.type,
            content=message.content
        )

    def clear(self):
        pass


def build_memory(chat_args):
    history = SupabaseMessageHistory(conversation_id=chat_args.conversation_id)
    print(history.messages)
    return ConversationBufferMemory(
        chat_memory=history,
        return_messages=True,
        memory_key="chat_history",
        output_key="answer"
    )
