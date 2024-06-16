import { IUser } from "@/interfaces/IUser.ts";

export interface ISong {
  _id: string
  ownerId: string
  owner?: IUser,
  presentations: string[]
  name: string
  songUrl: string
  lyrics: string
  thumb: string
  listens: number
  genres: string[]
  createdAt: string
  updatedAt: string
}
