import { createContext, ReactNode, useState } from "react";
import { ISong } from "@/interfaces";

export type TRepeat = 'none' | 'repeat-all' | 'repeat-one' | string
export enum AppContextEvent {
  TOGGLE_IS_PLAYING,
  CHANGE_REPEAT_TYPE,
  TOGGLE_IS_RANDOM,
  TOGGLE_IS_PLAYER_SHOW,
  SET_SONGS,
  SET_CURRENT_SONG
}

export interface AppContextProps {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  repeatType: TRepeat,
  setRepeatType: (type: TRepeat) => void,
  toggleRepeatType: () => void,
  isRandom: boolean,
  setIsRandom: (isRandom: boolean) => void,
  isPlayerShow: boolean,
  setIsPlayerShow: (isPlayerShow: boolean) => void,
  songs: ISong[],
  setSongs: (songs: ISong[]) => void,
  currentSong: number,
  setCurrentSong: (index: number) => void
}

export const AppContext = createContext<AppContextProps>({
  isPlaying: false,
  setIsPlaying: () => {},
  repeatType: 'none',
  setRepeatType: () => {},
  toggleRepeatType: () => {},
  isRandom: false,
  setIsRandom: () => {},
  isPlayerShow: true,
  setIsPlayerShow: () => {},
  songs: [],  setSongs: () => {},
  currentSong: 0,
  setCurrentSong: () => {},
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [repeatType, setRepeatType] = useState<TRepeat>('none');
  const [isRandom, setIsRandom] = useState<boolean>(false)
  const [isPlayerShow, setIsPlayerShow] = useState<boolean>(false)
  const [songs, setSongs] = useState<ISong[]>([])
  const [currentSong, setCurrentSong] = useState<number>(0)

  const toggleRepeatType = () => {
    if (repeatType === 'none') setRepeatType('repeat-all')
    else if (repeatType === 'repeat-all') setRepeatType('repeat-one')
    else setRepeatType('none')
  }

  return <AppContext.Provider
    value={{
      isPlaying,
      setIsPlaying,
      repeatType,
      setRepeatType,
      toggleRepeatType,
      isRandom,
      setIsRandom,
      isPlayerShow,
      setIsPlayerShow,
      songs,
      setSongs,
      currentSong,
      setCurrentSong
    }}
  >
    {children}
  </AppContext.Provider>
}
