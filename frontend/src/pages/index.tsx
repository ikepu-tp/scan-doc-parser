import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnswerField } from "~/utils/types";
import RectangularSelection from "../components/RectangularSelection";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function RouteComponent() {
  const [imageObj, setImageObj] = useState<string | undefined>();
  const imageRef = useRef<File | null>(null);
  const answerFieldsRef = useRef<AnswerField[]>([]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    imageRef.current = file;
    setImageObj(URL.createObjectURL(file));
  }

  function updateAnswerFields(fields: AnswerField[]): void {
    answerFieldsRef.current = fields;
  }

  function handleFileUpload(): void {
    if (!imageRef.current) return;
    const formData = new FormData();
    formData.append("image", imageRef.current);
    formData.append("answerFields", JSON.stringify(answerFieldsRef.current));
  }

  if (imageObj)
    return (
      <Box p={4}>
        <RectangularSelection
          imgSrc={imageObj}
          updateAnswerFields={updateAnswerFields}
        />
        <Button
          variant="contained"
          type="button"
          onClick={handleFileUpload}
          sx={{ mt: 2 }}
        >
          設定完了
        </Button>
      </Box>
    );

  return (
    <Box p={4}>
      <Typography variant="h5">サンプル画像アップロード</Typography>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{ mt: 2 }}
      >
        ファイルの選択
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  );
}
