import { api } from "@/services";
import { IUser } from "@/interfaces";
import { ErrorResponse, randomId, SuccessResponse } from "@/utils";

export const getUsers = async (): Promise<SuccessResponse<IUser[]> | ErrorResponse> => {
  try {
    const users = await api.get('/users')
    return users.data
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const login = async (email: string, password: string): Promise<SuccessResponse<IUser> | ErrorResponse> => {
  let response
  try {

    response = await api.post<SuccessResponse<IUser>>('/users/login', { email, password })
    return response.data
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const register = async (email: string, password: string): Promise<SuccessResponse<IUser> | ErrorResponse> => {
  try {
    const username = `user${randomId()}`
    const response = await api.post('/users', { email, password, username })
    return response.data
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const deleteUser = async (id: string): Promise<SuccessResponse<IUser> | ErrorResponse> => {
  try {
    const response = await api.delete(`/users/${id}`)
    return response.data
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const updateUser = async (user: Partial<IUser>): Promise<SuccessResponse<IUser> | ErrorResponse> => {
  try {
    const response = await api.patch(`/users`, user)
    return response.data
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const changePassword = async (id: string, password: string, newPassword: string): Promise<SuccessResponse<IUser> | ErrorResponse> => {
  try {
    const response = await api.post(`/changePassword`, { _id: id, password, newPassword })
    return response.data
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}

export const getUserById = async (id: string): Promise<SuccessResponse<IUser> | ErrorResponse> => {
  try {
    const response = await api.get(`/users/${id}`)
    return response.data
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new ErrorResponse(err.response.data.error)
  }
}
