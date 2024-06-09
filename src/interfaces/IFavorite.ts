import { ISong } from "@/interfaces/ISong.ts";

export interface IFavorite {
  _id: string
  ownerId: string
  songIds: string[]
  songs: ISong[]
  createdAt: string
  updatedAt: string
}
