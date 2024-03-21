import os
from supabase import create_client

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
