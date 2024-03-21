from ..services.supabase_service import get_supbase_client
from fastapi import HTTPException, Request


async def verify_auth_token(request: Request):
    authorization = request.headers.get("Authorization")
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split("Bearer ")[1]

    supabase = get_supbase_client()
    try:
        user = supabase.auth.get_user(token)
        if not user:
            raise HTTPException(status_code=401, detail="User doesn't exist")
        return user.user.id
    except Exception as e:
        raise HTTPException(status_code=401, detail="User doesn't exist")
