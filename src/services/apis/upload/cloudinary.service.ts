import axios from "axios";

import { CLOUD_NAME, UPLOAD_ASSET_NAME } from "@/config";
import { ErrorResponse } from "@/utils";
import { ICloudinaryResponse } from "@/interfaces";

type ResourceCloudinaryType = 'image' | 'auto' | string

export const uploadFileToCloudinary = async (file: File, resourceType: ResourceCloudinaryType): Promise<ICloudinaryResponse | ErrorResponse> => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_ASSET_NAME)
    const response = await axios.post(url, formData)
    return response.data
  } catch (error) {
    console.log(error)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}
