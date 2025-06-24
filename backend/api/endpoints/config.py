from fastapi import APIRouter, UploadFile, File
import json
from pathlib import Path

router = APIRouter()
MAP_DIR = Path("storage/map")

@router.post("/upload-config/")
async def upload_config(file: UploadFile = File(...)):
    save_path = MAP_DIR / file.filename
    content = await file.read()
    with open(save_path, "wb") as f:
        f.write(content)
    return {"filename": file.filename, "status": "config uploaded"}


@router.get("/list-configs/")
def list_configs():
    configs = [f.name for f in MAP_DIR.glob("*.json")]
    return {"configs": configs}
