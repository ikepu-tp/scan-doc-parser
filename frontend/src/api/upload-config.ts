import { AnswerField, Response } from "~/utils/types";
import axios from "./../libs/axios";

export type uploadConfigRequest = {
  image: File;
  answerFields: AnswerField[];
};
export type uploadConfigResource = {
  configId: string;
};
export default async function uploadConfig(
  req: uploadConfigRequest,
): Promise<Response<uploadConfigResource>> {
  const formData = new FormData();
  formData.append("image", req.image);
  formData.append("answerFields", JSON.stringify(req.answerFields));

  let result: Response<uploadConfigResource> = { result: "error" };
  try {
    const res = await axios.post("/upload-config", formData);
    result = res.data;
  } catch (error) {
    result["message"] = "Failed to upload config";
    console.error("Error uploading config:", error);
  }

  return result;
}
