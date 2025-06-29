import { Box, TextField } from "@mui/material";
import { AnswerField, updateAnswerField } from "~/utils/types";

export type AnswerFieldItemProps = {
  field: AnswerField;
  idx: number;
  updateAnswerField: updateAnswerField;
};
export default function AnswerFieldItem(props: AnswerFieldItemProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;

    const updatedField: AnswerField = {
      ...props.field,
      [e.target.name]: value,
    };
    props.updateAnswerField(props.idx, updatedField);
  }
  return (
    <Box sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}>
      <TextField
        name="x"
        label="X座標"
        type="number"
        value={props.field.x}
        onChange={handleChange}
      />
      <TextField
        name="y"
        label="Y座標"
        type="number"
        value={props.field.y}
        onChange={handleChange}
      />
      <TextField
        name="width"
        label="幅"
        type="number"
        value={props.field.width}
        onChange={handleChange}
      />
      <TextField
        name="height"
        label="高さ"
        type="number"
        value={props.field.height}
        onChange={handleChange}
      />
    </Box>
  );
}
