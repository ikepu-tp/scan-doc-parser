import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setImageObj(URL.createObjectURL(file));
  }

  if (imageObj)
    return (
      <Box p={4}>
        <RectangularSelection imgSrc={imageObj} />
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
