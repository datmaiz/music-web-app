import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@/layouts";
import { Home, Login, MyMusic, NotFoundPage, Profile, Register, Search, Setting, Playlist, Playlists } from "@/pages";
import { pathOfRoutes } from "@/utils";
import { RequiredAdmin, RequiredAuth } from "@/routes/PrivateRoutes.tsx";
import { MusicsManagement, UserDetail, UsersManagement } from "@/pages/Admin";
import { Upload } from "@/pages/Upload";
import { Favorite } from "@/pages/Favorite";
import { Stream } from "@/pages/Stream";
import PostManagement from "@/pages/Admin/PostManagement.tsx";

const {
  HOME,
  SEARCH,
  PROFILE,
  SETTINGS,
  MY_MUSIC,
  PLAYLIST,
  DASHBOARD,
  LOGIN,
  REGISTER,
  USER_MANAGEMENT,
  MUSIC_MANAGEMENT,
  POST_MANAGEMENT,
  USER_DETAIL,
  PLAYLIST_DETAIL,
  UPLOAD,
  FAVORITE,
  STREAM
} = pathOfRoutes

export const PublicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: `${DASHBOARD}`,
        element: <RequiredAuth />,
        children: [
          {
            index: true,
            path: HOME,
            element: <Home />
          },
          {
            path: SEARCH,
            element: <Search />
          },
          {
            path: MY_MUSIC,
            element: <MyMusic />
          },
          {
            path: SETTINGS,
            element: <Setting />
          },
          {
            path: PROFILE,
            element: <Profile />
          },
          {
            path: PLAYLIST,
            element: <Playlists />,
          },
          {
            path: `${PLAYLIST_DETAIL}`,
            element: <Playlist />
          },
          {
            path: `${UPLOAD}`,
            element: <Upload />
          },
          {
            path: `${FAVORITE}`,
            element: <Favorite />
          },
          {
            path: `${STREAM}`,
            element: <Stream />
          },
        ]
      },
      {
        path: 'admin',
        element: <RequiredAdmin />,
        children: [
          {
            path: USER_MANAGEMENT,
            element: <UsersManagement />
          },
          {
            path: MUSIC_MANAGEMENT,
            element: <MusicsManagement />
          },
          {
            path: USER_DETAIL,
            element: <UserDetail />
          },
          {
            path: POST_MANAGEMENT,
            element: <PostManagement />
          }
        ]
      },

    ]
  },
  {
    path: `/${LOGIN}`,
    element: <Login />
  },
  {
    path: `/${REGISTER}`,
    element: <Register />
  },
  {
    path: "*",
    element: <NotFoundPage />
  },
])
