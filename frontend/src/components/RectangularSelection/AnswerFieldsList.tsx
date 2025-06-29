import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { AnswerField } from "~/utils/types";
import AnswerFieldItem from "./AnswerFieldItem";

export type AnswerFieldsListProps = {
  answerFields: AnswerField[];
  updateAnswerField: (index: number, field: AnswerField) => void;
};
export default function AnswerFieldsList(props: AnswerFieldsListProps) {
  return (
    <Box>
      {props.answerFields.map((field, idx) => (
        <Accordion key={field.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {field.id} - {Math.round(field.x)}, {Math.round(field.y)} / &nbsp;
            {Math.round(field.width)} x {Math.round(field.height)}
          </AccordionSummary>
          <AccordionDetails>
            <AnswerFieldItem
              field={field}
              idx={idx}
              updateAnswerField={props.updateAnswerField}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
