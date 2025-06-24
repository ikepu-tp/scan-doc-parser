import { Box, Button, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/upload")({
  component: RouteComponent,
});

function RouteComponent() {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = () => {
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      fetch("/api/upload-answers", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(() => alert("アップロード完了"))
        .catch(console.error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5">解答画像アップロード（複数可）</Typography>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <Button variant="contained" onClick={handleUpload} disabled={!files}>
        アップロード
      </Button>
    </Box>
  );
}
