import { ISong } from "@/interfaces/ISong.ts";
import { IUser } from "@/interfaces/IUser.ts";

export interface IFavorite {
  _id: string
  ownerId: string
  owner: IUser
  songIds: string[]
  songs: ISong[]
  createdAt: string
  updatedAt: string
}
