import { AnswerField, Response } from "~/utils/types";
import axios from "./../libs/axios";

export type uploadConfigRequest = {
  image: File;
  answerFields: AnswerField[];
};
export default async function uploadConfig(
  req: uploadConfigRequest,
): Promise<Response> {
  const formData = new FormData();
  formData.append("image", req.image);
  formData.append("answerFields", JSON.stringify(req.answerFields));
  const res = await axios.post("/upload-config", formData);
  return res.data;
}
