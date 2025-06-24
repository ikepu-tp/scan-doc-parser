from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from api.endpoints import upload, analyze, config

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

# エンドポイントルーティング
"""
app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(analyze.router, prefix="/analyze", tags=["Analyze"])
app.include_router(config.router, prefix="/config", tags=["Config"])
"""

# ルート確認用
@app.get("/")
def read_root():
    return {"message": "ScanDocParser API is running."}
