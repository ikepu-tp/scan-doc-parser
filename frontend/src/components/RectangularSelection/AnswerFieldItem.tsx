import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AnswerField, AnswerType, updateAnswerField } from "~/utils/types";

export type AnswerFieldItemProps = {
  field: AnswerField;
  idx: number;
  updateAnswerField: updateAnswerField;
};
export default function AnswerFieldItem(props: AnswerFieldItemProps) {
  function handleChangeAnswerType(e: SelectChangeEvent<AnswerType>): void {
    const updatedField: AnswerField = {
      ...props.field,
      answerType: e.target.value as AnswerType,
    };
    props.updateAnswerField(props.idx, updatedField);
  }
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
      <FormControl>
        <InputLabel
          id={`answer-field_type-form_field-id-${props.field.id}-label`}
        >
          回答方式
        </InputLabel>
        <Select
          labelId={`answer-field_type-form_field-id-${props.field.id}-label`}
          id={`answer-field_type-form_field-id-${props.field.id}-select`}
          value={props.field.answerType}
          label="回答方式"
          onChange={handleChangeAnswerType}
        >
          <MenuItem value="single-select">単一選択</MenuItem>
          <MenuItem value="text">テキスト</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
