from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List
from uuid import uuid4
from pathlib import Path
import shutil
import json

from pydantic import BaseModel

router = APIRouter()

# 型定義
class AnswerField(BaseModel):
    id: str
    x: float
    y: float
    width: float
    height: float
    answerType: str  # "text", "single-select", etc.

@router.post("/config", summary="サンプル画像と回答欄をアップロード")
async def upload_sample_image_with_config(
    image: UploadFile = File(...),
    answerFields: str = Form(...)
):
    try:
        fields: List[AnswerField] = json.loads(answerFields)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid answerFields JSON: {str(e)}")

    # 一意なIDを生成
    config_id = str(uuid4())

    # 保存ディレクトリ
    image_dir = Path(f"storage/images/{config_id}")
    map_dir = Path("storage/map")
    image_dir.mkdir(parents=True, exist_ok=True)
    map_dir.mkdir(parents=True, exist_ok=True)

    # 拡張子を確認
    ext = image.filename.split(".")[-1].lower()
    if ext not in ("jpg", "jpeg", "png"):
        raise HTTPException(status_code=400, detail="Only jpg/jpeg/png are supported.")

    # 画像保存
    image_path = image_dir / f"sample.{ext}"
    with image_path.open("wb") as f:
        shutil.copyfileobj(image.file, f)

    # map json 保存
    map_path = map_dir / f"{config_id}.json"
    with map_path.open("w", encoding="utf-8") as f:
        json.dump([field for field in fields], f, ensure_ascii=False, indent=2)

    return {
        "result": True,
        "data": {
            "configId": config_id,
            "imagePath": str(image_path),
            "mapPath": str(map_path),
        },
    }
