import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import { AnswerField } from "../utils/types";

export type RectangularSelectionProps = {
  imgSrc?: string; // 画像の初期ソース
};
export default function RectangularSelection(props: RectangularSelectionProps) {
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [answerFields, setAnswerFields] = useState<AnswerField[]>([]);
  const [newRect, setNewRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const stageRef = useRef<any>(null);

  // ドラッグ選択開始座標
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!props.imgSrc) return;
    const img = new window.Image();
    img.src = props.imgSrc;
    img.onload = () => {
      setImageObj(img);
    };
  }, [props.imgSrc]);

  // ステージでドラッグ開始
  const handleMouseDown = (e: any) => {
    if (!imageObj) return;
    const pos = e.target.getStage().getPointerPosition();
    startPos.current = pos;
    setNewRect({
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
    });
    setIsDragging(true);
  };

  // ドラッグ中に矩形サイズを更新
  const handleMouseMove = (e: any) => {
    if (!isDragging || !newRect) return;
    const pos = e.target.getStage().getPointerPosition();
    const newWidth = pos.x - startPos.current.x;
    const newHeight = pos.y - startPos.current.y;
    setNewRect({
      x: startPos.current.x,
      y: startPos.current.y,
      width: newWidth,
      height: newHeight,
    });
  };

  // ドラッグ終了時に矩形をAnswerFieldとして追加
  const handleMouseUp = () => {
    if (!isDragging || !newRect) return;
    setIsDragging(false);

    // 幅高さは絶対値にする。負の場合はx,yを調整
    let x = newRect.x;
    let y = newRect.y;
    let width = newRect.width;
    let height = newRect.height;

    if (width < 0) {
      x = x + width;
      width = Math.abs(width);
    }
    if (height < 0) {
      y = y + height;
      height = Math.abs(height);
    }

    if (width < 10 || height < 10) {
      // 小さすぎる矩形は無視
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
    setAnswerFields([...answerFields, newField]);
    setNewRect(null);
  };

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
            width={800}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              <KonvaImage
                image={imageObj}
                width={800}
                height={600}
                listening={false}
                perfectDrawEnabled={false}
              />
              {/* 選択中の矩形 */}
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
              {/* 設定済み回答欄 */}
              {answerFields.map((field) => (
                <Rect
                  key={field.id}
                  x={field.x}
                  y={field.y}
                  width={field.width}
                  height={field.height}
                  stroke="red"
                  strokeWidth={2}
                />
              ))}
            </Layer>
          </Stage>
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">設定済み回答欄一覧</Typography>
        {answerFields.length === 0 && (
          <Typography>まだ回答欄が設定されていません。</Typography>
        )}
        {answerFields.map((field) => (
          <Box
            key={field.id}
            sx={{
              border: "1px solid #ccc",
              p: 1,
              mb: 1,
              borderRadius: 1,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography>
              {field.id} - {Math.round(field.x)}, {Math.round(field.y)} /{" "}
              {Math.round(field.width)} x {Math.round(field.height)}
            </Typography>
            <Typography>回答方式：単一選択</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
