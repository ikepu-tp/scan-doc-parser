import { Response } from "~/utils/types";
import axios from "./../libs/axios";

export type uploadImageRequest = {
  configId: string;
  images: File[];
};
export default async function uploadImage(
  req: uploadImageRequest,
): Promise<Response> {
  const formData = new FormData();
  formData.append("configId", req.configId);
  req.images.forEach((image, index) => {
    formData.append(`image[${index}]`, image);
  });

  let result: Response = { result: "error" };
  try {
    const res = await axios.post("/upload-images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    result = res.data;
  } catch (error) {
    result["message"] = "Failed to upload images";
    console.error("Error uploading images:", error);
  }
  return result;
}
