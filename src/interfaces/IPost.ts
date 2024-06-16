import { IUser } from "@/interfaces/IUser.ts";
import { IComment } from "@/interfaces/IComment.ts";

export interface IPost {
  _id: string
  ownerId: string
  owner: IUser
  title: string
  images: string[]
  likes: string[]
  shares: string[]
  tags: string[]
  comments: IComment[]
  createdAt: string
  updatedAt: string
}
