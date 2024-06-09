import { IUser } from "@/interfaces/IUser.ts";

export interface IPost {
  _id: string
  ownerId: string
  owner: IUser
  title: string
  images: string[]
  likes: string[]
  shares: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
}
