import { IPost } from "@/interfaces";
import { ErrorResponse, SuccessResponse } from "@/utils";
import { api } from "@/services";

export const createPost = async (post: Partial<IPost>): Promise<SuccessResponse<IPost> | ErrorResponse> => {
  try {
    const response = await api.post(`/posts`, post);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const getPosts = async (): Promise<SuccessResponse<IPost[]> | ErrorResponse> => {
  try {
    const response = await api.get(`/posts`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const getPostsOnPage = async (
  page: number = 1, offset: number = 0, limit: number = 5, ownerId: string = ''
): Promise<SuccessResponse<IPost[]> | ErrorResponse> => {
  try {
    const response = await api.get(`/posts?page=${page}&offset=${offset}&limit=${limit}&ownerId=${ownerId}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const getPostsByOwnerId = async (
  ownerId: string, page: number = 1, offset: number = 0, limit: number = 5
): Promise<SuccessResponse<IPost[]> | ErrorResponse> => {
  try {
    const response = await api.get(`/posts/${ownerId}?page=${page}&offset=${offset}&limit=${limit}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const getPostById = async (
  postId: string, page: number = 1, offset: number = 0, limit: number = 5
): Promise<SuccessResponse<IPost> | ErrorResponse> => {
  try {
    const response = await api.get(`/posts/${postId}?page=${page}&offset=${offset}&limit=${limit}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const updatePost = async (post: Partial<IPost>, postId: string): Promise<SuccessResponse<IPost> | ErrorResponse> => {
  try {
    const response = await api.patch(`/posts/${postId}`, post);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}

export const deletePost = async (postId: string): Promise<SuccessResponse<IPost> | ErrorResponse> => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(error.response.data.error)
  }
}
