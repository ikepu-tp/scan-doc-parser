import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, useState } from "react";
import uploadImage from "./../api/upload-images";

export const Route = createFileRoute("/upload")({
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
  const [imageObj, setImageObj] = useState<File[]>([]);

  function handleUpload(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageObj((prev) => [...prev, ...files]);
  }
  async function handleSubmit(): Promise<void> {
    if (imageObj.length === 0) {
      alert("画像が選択されていません。");
      return;
    }
    const res = await uploadImage({
      configId: "dummy-config-id", // ここは実際のconfigIdに置き換える必要があります
      images: imageObj,
    });
    if (res.result === "success") {
      alert("画像のアップロードが成功しました。");
      setImageObj([]); // アップロード後に画像リストをクリア
    } else {
      alert(`アップロードに失敗しました: ${res.error || res.message}`);
    }
  }

  return (
    <Box p={4}>
      <Typography variant="h5">回答画像アップロード（複数可）</Typography>
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
          multiple
          onChange={handleUpload}
        />
      </Button>
      {imageObj.length > 0 && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            アップロードされた画像
          </Typography>
          {imageObj.map((file, idx) => (
            <Box
              key={idx}
              sx={{ display: "inline-block", textAlign: "center" }}
            >
              <Box
                component="img"
                src={URL.createObjectURL(file)}
                alt={file.name}
                sx={{ width: 300, m: 2, objectFit: "cover" }}
              />
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                {file.name}
              </Typography>
            </Box>
          ))}
          <Box>
            <Button
              variant="contained"
              type="button"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
              disabled={imageObj.length === 0}
            >
              アップロード
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
