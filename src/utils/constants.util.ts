export const globalColor = {
  primary: '#fe5a00',
  secondary: '#ff8a01'
}

export const pathOfRoutes = {
  DASHBOARD: 'dashboard',
  HOME: '',
  SEARCH: 'search',
  MY_MUSIC: 'my-music',
  SETTINGS: 'settings',
  PROFILE: 'profile',
  PLAYLIST: 'playlist',
  LOGIN: 'login',
  REGISTER: 'register',
  FAVORITE: 'favorite',
  UPLOAD: 'upload',
  ALBUM: 'album',
  ADMIN: 'admin',
  USER_MANAGEMENT: 'users-management',
  MUSIC_MANAGEMENT: 'musics-management',
  USER_DETAIL: 'user/:userId',
  PLAYLIST_DETAIL: `playlist/:playlistId`,
  STREAM: 'stream',
  POST_DETAIL: 'posts/:postId'
}

export enum Role {
  ADMIN,
  CLIENT
}
