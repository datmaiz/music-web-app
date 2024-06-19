import React, { useCallback, useContext, useEffect, useState } from "react"
import { PlaylistCard, SongItem } from "@/components/ui"
import { HeaderLayout } from "@/layouts"
import { useAuth } from "@/hooks"
import { getSongs } from "@/services"
import { ErrorResponse } from "@/utils"
import { toast } from "react-toastify"
import { IFavorite, ISong } from "@/interfaces"
import { LoadingIcon } from "@/assets/icons/filled";
import {
  addToFavorite,
  deleteSongsFromFavorite,
  getFavorite
} from "@/services/apis/favorite/favoriteService.service.ts";
import { AppContext } from "@/context";

interface LoadingProps {
  fetching: boolean
}

interface HomeState {
  songs: ISong[]
  favorite: IFavorite
}

const initialHomeState: HomeState = {
  songs: [],
  favorite: {
    _id: "",
    ownerId: "",
    owner: {
      _id: "",
      username: "",
      email: "",
      password: "",
      isAdmin: false,
      avatar: ""
    },
    songIds: [],
    songs: [],
    createdAt: "",
    updatedAt: ""
  }
}

const initialLoadingProps: LoadingProps = {
  fetching: true
}

export const Home: React.FC = () => {
  const [loading, setLoading] = useState<LoadingProps>(initialLoadingProps)
  const [state, setState] = useState<HomeState>(initialHomeState)

  const user = useAuth()!
  const { setSongs, setIsPlayerShow, setCurrentSong } = useContext(AppContext)

  const handleAddToFavorite = useCallback(async (song: ISong) => {
    const newFavorite = {
      ...state.favorite,
      songs: [...state.favorite.songs, song],
      songIds: [...state.favorite.songIds, song._id]
    }
    setState({ ...state, favorite: newFavorite })
    const response = await addToFavorite(song._id, user._id)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
    }
  }, [state, user._id])

  const handleRemoveFromFavorite = useCallback(async (song: ISong) => {
    const newFavorite = {
      ...state.favorite,
      songs: state.favorite.songs.filter(song => song._id !== song._id),
      songIds: state.favorite.songIds.filter(id => id !== song._id)
    }
    setState({ ...state, favorite: newFavorite })
    const response = await deleteSongsFromFavorite(user._id, song._id)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
    }
  }, [state])

  const handleSongItemClick = (songId: string) => {
    const index = state.songs.findIndex(song => song._id === songId)
    setSongs(state.songs)
    setCurrentSong(index)
    setIsPlayerShow(true)
  }

  useEffect(() => {
    (async () => {
      const keys = Object.keys(initialHomeState)
      let data = { ...state }
      const responses = await Promise.allSettled([
        getSongs(),
        getFavorite(user._id),
      ])
      responses.forEach((response, index) => {
        if (response.status === 'fulfilled') {
          const { value } = response
          if (value instanceof ErrorResponse) {
            toast.error(value.error)
          } else {
            data = { ...data, [keys[index]]: value.data }
          }
        }
      })
      // console.log(state)
      setState(data)
      setLoading({ ...loading, fetching: false })
    })()
  }, []);

  return <div className={`text-white`}>
    <HeaderLayout>
      <div>
        <h1
          className={`text-title-large mb-2`}>Good {new Date().getHours() < 13 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}</h1>
        <p className={`text-[12px] md:text-sm`}>{user.username}</p>
      </div>
    </HeaderLayout>

    <section className={`bg-[#2962a3] p-6 rounded-3xl`}>
      <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold max-w-[800px] mb-4`}>
        Play the music you like, explore songs,
        <span className={`text-secondary`}>
          listen anytime and anywhere
        </span> now it's easier
      </p>
      <p className={`text-sm sm:text-md lg:text-lg`}>A new experience of listening to music at your fingertips</p>
    </section>

    {loading.fetching ? (
      <div className={'flex-center p-8'}>
        <LoadingIcon widht={50} height={50} />
      </div>
    ) : (<section>
      < div className={`flex justify-between py-8`}>
        <h3 className={`text-title-medium`}>Most Popular Playlist</h3>
        <span className={`text-secondary cursor-pointer font-bold`}>See more</span>
      </div>
      <div className={`flex gap-6 snap-mandatory overflow-auto scroll-hidden`}>
        {state.songs.map(song => (
          <PlaylistCard
            onClick={() => handleSongItemClick(song._id)}
            key={song._id}
            name={song.name}
            thumb={song.thumb}
            authors={song.presentations}
            className={`shrink-0 aspect-square snap-center`}
          />
        ))}
      </div>
    </section>)}

    {loading.fetching ? (
      <div className={'flex-center'}>
        <LoadingIcon widht={50} height={50} />
      </div>
    ) : (<section className={`w-full`}>
      <div className="flex justify-between py-8">
        <h3 className={`text-title-medium`}>Popular Music</h3>
        <span className={`text-secondary cursor-pointer font-bold`}>See more</span>
      </div>
      <div className={`flex flex-col`}>
        {state.songs.map(song => (
          <SongItem
            onClick={() => handleSongItemClick(song._id)}
            onRemoveFromFavorite={handleRemoveFromFavorite}
            onAddToFavorite={handleAddToFavorite}
            song={song}
            key={song._id}
            isFavorite={state.favorite.songIds.includes(song._id)}
          />))}
      </div>
    </section>)}
  </div>
}
