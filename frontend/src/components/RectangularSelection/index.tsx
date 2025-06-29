import { Box, Typography } from "@mui/material";
import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import { AnswerField } from "~/utils/types";
import AnswerFieldsList from "./AnswerFieldsList";
import RectangularSelectedArea from "./SelectedArea";

export type RectangularSelectionProps = {
  imgSrc?: string; // 画像の初期ソース
  updateAnswerFields: (fields: AnswerField[]) => void; // 親コンポーネントへのコールバック
};
export default function RectangularSelection(props: RectangularSelectionProps) {
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [stageSize, setStageSize] = useState<{ width: number; height: number }>(
    { width: 800, height: 600 },
  );
  const [answerFields, setAnswerFields] = useState<AnswerField[]>([]);
  const [newRect, setNewRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<any>(null);
  const startPos = useRef<Vector2d>({ x: 0, y: 0 });

  useEffect(() => {
    if (!props.imgSrc) return;
    const img = new window.Image();
    img.src = props.imgSrc;
    img.onload = () => {
      setImageObj(img);
      setStageSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [props.imgSrc]);
  useEffect(() => {
    if (imageObj) props.updateAnswerFields(answerFields);
  }, [answerFields]);

  function handleMouseDown(e: Konva.KonvaEventObject<MouseEvent>): void {
    if (e.target !== e.target.getStage()) return; // 既存オブジェクト選択を無視
    const pos = e.target.getStage().getPointerPosition();
    startPos.current = pos || { x: 0, y: 0 };
    setNewRect({ ...startPos.current, width: 0, height: 0 });
    setIsDragging(true);
  }

  function handleMouseMove(e: Konva.KonvaEventObject<MouseEvent>): void {
    if (!isDragging || !newRect) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    setNewRect({
      x: startPos.current.x,
      y: startPos.current.y,
      width: pos.x - startPos.current.x,
      height: pos.y - startPos.current.y,
    });
  }

  function handleMouseUp(): void {
    if (!isDragging || !newRect) return;
    setIsDragging(false);

    let { x, y, width, height } = newRect;
    if (width < 0) {
      x += width;
      width = Math.abs(width);
    }
    if (height < 0) {
      y += height;
      height = Math.abs(height);
    }
    if (width < 10 || height < 10) {
      setNewRect(null);
      return;
    }

    const newField: AnswerField = {
      id: `Q${answerFields.length + 1}`,
      x,
      y,
      width,
      height,
      answerType: "single-select",
    };
    setAnswerFields((prev) => [...prev, newField]);
    setNewRect(null);
  }

  function updateAnswerField(index: number, field: AnswerField): void {
    const updatedFields = [...answerFields];
    updatedFields[index] = field;
    setAnswerFields(updatedFields);
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        回答欄設定
      </Typography>
      <Box
        sx={{
          mt: 2,
          border: "1px solid #ddd",
          width: "800px",
          height: "600px",
          position: "relative",
        }}
      >
        {imageObj && (
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              <KonvaImage
                image={imageObj}
                width={stageSize.width}
                height={stageSize.height}
                listening={false}
              />
              {newRect && (
                <Rect
                  x={newRect.x}
                  y={newRect.y}
                  width={newRect.width}
                  height={newRect.height}
                  fill="rgba(0, 162, 255, 0.3)"
                  stroke="#00a2ff"
                  strokeWidth={2}
                />
              )}
              {answerFields.map((field, idx) => (
                <RectangularSelectedArea
                  key={field.id}
                  field={field}
                  idx={idx}
                  updateAnswerField={updateAnswerField}
                />
              ))}
            </Layer>
          </Stage>
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">設定済み回答欄一覧</Typography>
        <AnswerFieldsList
          answerFields={answerFields}
          updateAnswerField={updateAnswerField}
        />
      </Box>
    </Box>
  );
}
