export type AnswerType = "single-select" | "text";
export type AnswerField = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  answerType: AnswerType;
};
export type updateAnswerField = (index: number, field: AnswerField) => void;
export type Response<R = {}> = {
  result: "success" | "error";
  message?: string;
  data?: R;
  error?: string;
};
