from langchain.chains import ConversationalRetrievalChain
from .models import ChatArgs
from .vector_stores.pipecone import build_retriever
from app.chat.llms.chatopenai import build_llm
from app.chat.memories.supabase_memory import build_memory


def build_chat(chat_args: ChatArgs):
    retriever = build_retriever(chat_args)
    llm = build_llm(chat_args)
    memory = build_memory(chat_args)

    return ConversationalRetrievalChain.from_llm(
        llm=llm,
        memory=memory,
        retriever=retriever
    )
