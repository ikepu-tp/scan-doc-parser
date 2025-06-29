import Konva from "konva";
import { Rect } from "react-konva";
import { AnswerField, updateAnswerField } from "../utils/types";

export type RectangularSelectedAreaProps = {
  field: AnswerField;
  idx: number;
  updateAnswerField: updateAnswerField;
};
export default function RectangularSelectedArea(
  props: RectangularSelectedAreaProps,
) {
  function handleDragMove(e: Konva.KonvaEventObject<DragEvent>): void {
    const rect = e.target;
    const updatedFields: AnswerField = {
      ...props.field,
      x: rect.x(),
      y: rect.y(),
    };
    props.updateAnswerField(props.idx, updatedFields);
  }

  return (
    <Rect
      x={props.field.x}
      y={props.field.y}
      width={props.field.width}
      height={props.field.height}
      stroke="red"
      strokeWidth={2}
      draggable
      onDragEnd={handleDragMove}
    />
  );
}
