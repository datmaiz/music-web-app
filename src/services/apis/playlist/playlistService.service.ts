import { ErrorResponse, SuccessResponse } from "@/utils";
import { IPlaylist } from "@/interfaces";
import { api } from "@/services";

export const getPlaylists = async (): Promise<SuccessResponse<IPlaylist[]> | ErrorResponse> => {
  try {
    const response = await api.get('/playlist/collections/all');
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const getPlaylistsByOwnerId = async (ownerId: string): Promise<SuccessResponse<IPlaylist[]> | ErrorResponse> => {
  try {
    const response = await api.get(`/playlist/collection/${ownerId}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const getPlaylist = async (playlistId: string): Promise<SuccessResponse<IPlaylist> | ErrorResponse> => {
  try {
    const response = await api.get(`/playlist/${playlistId}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const createPlaylist = async (playlist: Partial<IPlaylist>): Promise<SuccessResponse<unknown> | ErrorResponse> => {
  try {
    const response = await api.post(`/playlist`, playlist);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const addSongToPlaylist = async (playlistId: string, songId: string): Promise<SuccessResponse<unknown> | ErrorResponse> => {
  try {
    const response = await api.post(`/playlist/${playlistId}`, { songId });
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const deleteSongFromPlaylist = async (playlistId: string, songId: string): Promise<SuccessResponse<unknown> | ErrorResponse> => {
  try {
    const response = await api.delete(`/playlist/${playlistId}/${songId}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const deletePlaylist = async (playlistId: string): Promise<SuccessResponse<unknown> | ErrorResponse> => {
  try {
    const response = await api.delete(`/playlist`, { params: { playlistId } });
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}
