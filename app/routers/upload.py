import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.chat.create_embeddings import create_embeddings_for_pdf
from app.services.supabase_service import get_supbase_client

router = APIRouter()
supabase_client = get_supbase_client()


@router.post("/upload/", tags=["upload"])
async def upload_file(file: UploadFile = File(...)):
    file_content = await file.read()
    file_name = file.filename

    try:
        upload_file_to_supabase(file_name, file_content)
        public_url = get_file_url_from_supabase(file_name)

        # Pass file url to create embeddings
        create_embeddings_for_pdf(id=file_name, path=public_url)

        return {
            "message": "File has been uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def upload_file_to_supabase(file_name, file_content, content_type="application/pdf"):
    supabase_client.storage.from_(os.getenv("SUPABASE_BUCKET_NAME")).upload(path=file_name, file=file_content,
                                                                            file_options={
                                                                                "content-type": content_type})


def get_file_url_from_supabase(file_name):
    public_url = supabase_client.storage.from_(os.getenv("SUPABASE_BUCKET_NAME")).get_public_url(file_name)
    return public_url
