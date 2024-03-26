from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from app.chat.vector_stores.pipecone import vector_store


def create_embeddings_for_pdf(id: str, path: str):
    """
    Generate and store embeddings for the given pdf

    :param id: The unique identifier for the PDF.
    :param path: The file path to the PDF.

    Example Usage:

    create_embeddings_for_pdf('21bjbsad', '/path_to_pdf')
    """

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    loader = PyPDFLoader(path)
    docs = loader.load_and_split(text_splitter)

    for doc in docs:
        doc.metadata = {
            "page": doc.metadata["page"],
            "text": doc.page_content,
            "doc_id": id
        }
    vector_store.add_documents(docs)
