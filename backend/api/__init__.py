from fastapi import APIRouter
from .endpoints import upload, analyze, config

router = APIRouter()

# エンドポイントルーティング
router.include_router(upload.router)
router.include_router(analyze.router)
router.include_router(config.router)
