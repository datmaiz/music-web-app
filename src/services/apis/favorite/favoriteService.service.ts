import { IFavorite, ISong } from "@/interfaces";
import { ErrorResponse, SuccessResponse } from "@/utils";
import { api } from "@/services";

export const addToFavorite = async (songId: string): Promise<SuccessResponse<ISong> | ErrorResponse> => {
  try {
    const response = await api.post(`/favorites`, songId);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const createFavorite = async (ownerId: string): Promise<SuccessResponse<IFavorite> | ErrorResponse> => {
  try {
    const response = await api.post(`/favorites`, { ownerId });
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const getSongsFromFavorite = async (ownerId: string): Promise<SuccessResponse<ISong[]> | ErrorResponse> => {
  try {
    const response = await api.post(`/favorites`, { ownerId });
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const deleteSongsFromFavorite = async (ownerId: string): Promise<SuccessResponse<IFavorite> | ErrorResponse> => {
  try {
    const response = await api.post(`/favorites`, { ownerId });
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}
