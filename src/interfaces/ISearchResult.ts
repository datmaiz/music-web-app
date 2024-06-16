import { IUser } from "@/interfaces/IUser.ts";
import { ISong } from "@/interfaces/ISong.ts";

export interface ISearchResult {
  users: IUser[]
  songs: ISong[]
}
