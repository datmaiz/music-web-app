import { ErrorResponse, SuccessResponse } from "@/utils";
import { api } from "@/services";
import { ISearchResult } from "@/interfaces";

export const search = async (q: string): Promise<SuccessResponse<ISearchResult> | ErrorResponse> => {
  try {
    const response = await api.get(`/search?q=${q}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}
