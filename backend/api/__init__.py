from fastapi import APIRouter
from .endpoints import upload, analyze, config

router = APIRouter()

# エンドポイントルーティング
router.include_router(config.router)
