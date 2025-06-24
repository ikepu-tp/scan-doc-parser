from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import router

app = FastAPI(
    title="ScanDocParser API",
    description="API backend for ScanDocParser - OCR and mark recognition tool",
    version="1.0.0",
)

# CORS対応（開発用にオープンに設定）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番では制限を設ける
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    # APIエンドポイントのインポート
    router,  # api/__init__.pyで定義されたルーターを使用
    prefix="/api",
)

# ルート確認用
@app.get("/")
def read_root():
    return {"message": "ScanDocParser API is running."}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
