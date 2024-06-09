import { ISong } from "@/interfaces";

export interface IPlaylist {
  _id: string
  name: string
  ownerId: string
  songIds?: string[]
  songs?: ISong[]
}
