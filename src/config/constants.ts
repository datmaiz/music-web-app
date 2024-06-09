import { IMenuItem } from "@/interfaces";
import { hitMusicPerson, nostalgicMusic, popMusicPerson, relaxMusicPerson } from "@/assets/images";
import { IBannerImage } from "@/interfaces";
import { HomeFilledIcon, MusicFilledIcon, SearchFilledIcon } from "@/assets/icons/filled";
import {
  MusicManagementOutlinedIcon,
  PostCardOutlinedIcon,
  UsersManagementOutlinedIcon
} from "@/assets/icons/outlined";

export const baseURL = import.meta.env.VITE_BASE_URL
export const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
export const UPLOAD_ASSET_NAME = import.meta.env.VITE_UPLOAD_ASSET_NAME

export const clientMenus: IMenuItem[] = [
  {
    title: 'Home',
    icon: HomeFilledIcon,
    path: '/dashboard'
  },
  {
    title: 'Search',
    icon: SearchFilledIcon,
    path: '/dashboard/search'
  },
  {
    title: 'Stream',
    icon: PostCardOutlinedIcon,
    path: '/dashboard/stream'
  },
  {
    title: 'My music',
    icon: MusicFilledIcon,
    path: '/dashboard/my-music'
  },
]

export const adminMenus: IMenuItem[] = [
  {
    title: 'Users Management',
    path: '/admin/users-management',
    icon: UsersManagementOutlinedIcon
  },
  {
    title: 'Musics Management',
    path: '/admin/musics-management',
    icon: MusicManagementOutlinedIcon
  },
]

export const searchTags: string[] = [
  'Music Popular', 'Playlist', 'PopPunk', 'Romance', 'Viral Music', 'Indie Music', 'Pop', 'Reggae'
]

export const sourceOfBannerSearchImages: IBannerImage[][] = [
  [
    {
      title: 'The Most Hits Music 2023',
      src: hitMusicPerson,
      background: 'bg-[##319b62]'
    },
    {
      title: 'Relax',
      src: relaxMusicPerson,
      background: ''
    },
  ],
  [
    {
      title: 'Pop Punk',
      src: popMusicPerson,
      background: ''
    },
    {
      title: 'Nostalgic Songs 90s high school era',
      src: nostalgicMusic,
      background: ''
    },
  ],
]

export const defaultAvatar = 'https://res.cloudinary.com/dtxybpzwd/image/upload/v1713529576/music-app/default_avatar_bi3cim.jpg'
