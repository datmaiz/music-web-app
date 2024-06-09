import { api } from "@/services";
import { ErrorResponse, SuccessResponse } from "@/utils";
import { ISong } from "@/interfaces";

export const createSong = async (song: Partial<ISong>): Promise<SuccessResponse<ISong> | ErrorResponse> => {
  try {
    const response = await api.post(`/songs`, song);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const getSongs = async (): Promise<SuccessResponse<ISong[]> | ErrorResponse> => {
  try {
    const response = await api.get(`/songs`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const getSongById = async (songId: string): Promise<SuccessResponse<ISong> | ErrorResponse> => {
  try {
    const response = await api.get(`/songs/${songId}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const getSongByOwnerId = async (ownerId: string): Promise<SuccessResponse<ISong[]> | ErrorResponse> => {
  try {
    const response = await api.get(`/songs/owner/${ownerId}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const updateSong = async (songId: string, updatedSong: Partial<ISong>): Promise<SuccessResponse<ISong> | ErrorResponse> => {
  try {
    const response = await api.patch(`/songs/${songId}`, updatedSong);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const deleteSong = async (songId: string): Promise<SuccessResponse<ISong> | ErrorResponse> => {
  try {
    const response = await api.delete(`/songs/${songId}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}
