from fastapi import APIRouter
from ...core.ocr import run_batch_analysis  # 仮のOCR処理関数

router = APIRouter()

@router.post("/analyze/")
def analyze_images():
    result = run_batch_analysis()
    return {"status": "success", "details": result}
