import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/config")({
  component: RouteComponent,
});

function RouteComponent() {
  const [questionId, setQuestionId] = useState("");
  const [answerType, setAnswerType] = useState("");

  const handleSubmit = () => {
    const config = {
      questionId,
      answerType,
    };
    fetch("/api/save-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    })
      .then((res) => res.json())
      .then(() => alert("保存完了"))
      .catch(console.error);
  };

  return (
    <Box p={4}>
      <Typography variant="h5">解答欄設定</Typography>
      <TextField
        label="解答欄ID"
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Select
        value={answerType}
        onChange={(e) => setAnswerType(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>
          回答方式を選択
        </MenuItem>
        <MenuItem value="text">記述式（OCR）</MenuItem>
        <MenuItem value="choice">選択式（囲み）</MenuItem>
        <MenuItem value="likert">リッカート式</MenuItem>
      </Select>
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        保存
      </Button>
    </Box>
  );
}
