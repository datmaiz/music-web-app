import React, { ChangeEvent, Children, memo, useCallback, useEffect, useMemo, useState } from "react";
import { HeaderLayout } from "@/layouts";
import { useAuth } from "@/hooks";
import { ISong } from "@/interfaces";
import { deleteSong, getSongs } from "@/services";
import { ErrorResponse } from "@/utils";
import { toast } from "react-toastify";
import { LoadingIcon } from "@/assets/icons/filled";
import { Button, Image } from "@/components/elements";

interface LoadingProps {
  fetching: boolean
  deleting: boolean
}

const initialLoadingProps: LoadingProps = {
  deleting: false,
  fetching: true
}

const MusicsManagement = React.memo(() => {
  const [genresOption, setGenresOption] = useState<string>('all')
  const [loading, setLoading] = useState<LoadingProps>(initialLoadingProps)
  const [songs, setSongs] = useState<ISong[]>([])
  const [genresOptions, setGenresOptions] = useState<string[]>([])

  const user = useAuth()!

  const songToShow = useMemo(() => {
    if (genresOption === 'all') return songs
    return songs.filter(song => song.genres.includes(genresOption))
  }, [genresOption, songs])

  const onOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setGenresOption(value)
  }

  const handleDeleteSong = useCallback(async (id: string) => {
    const response = await deleteSong(id)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
    } else {
      toast.success(response.message)
      const newSongs = songs.filter(song => song._id !== song._id)
      setSongs(newSongs)
    }
  }, [])

  useEffect(() => {
    (async () => {
      const response = await getSongs()
      if (response instanceof ErrorResponse) {
        toast.error(response.error)
      } else {
        const songs = response.data
        songs && setSongs(songs)
        const genres = songs?.map(song => song.genres).flat()
        setGenresOptions([...new Set(genres)])
      }

      setLoading({ ...loading, fetching: false })
    })()
  }, []);

  return <div>
    <HeaderLayout>
      <div>
        <h2 className={`text-title-large font-bold`}>Hello admin</h2>
        <p className={`text-body-medium pt-2`}>{user.username}</p>
      </div>
    </HeaderLayout>

    <section className={'flex-between'}>
      <select
        value={genresOption}
        className={'py-2 px-6 bg-[#fff0] border border-[#999] rounded-lg cursor-pointer self-center'}
        onChange={onOptionChange}
      >
        <option className={'bg-[#000] rounded-lg'} value="all">All</option>
        {Children.toArray(genresOptions.map(genre => (
          <option
            className={'bg-[#000] rounded-lg'}
            value={genre}
          >{genre}</option>
        )))}
      </select>
    </section>

    <section className={'pt-8'}>
      <h4 className={'pb-4 text-2xl'}>Collections: </h4>
      {loading.fetching ? (
        <div className={'w-full flex-center'}><LoadingIcon width={50} height={50} /></div>
      ) : (
        <SongList
          songs={songToShow}
          onItemDelete={handleDeleteSong}
        />
      )}
    </section>
  </div>
})

interface SongListProps {
  songs: ISong[]
  onItemDelete: (id: string) => void
}

const SongList = memo(({ songs, onItemDelete }: SongListProps) => {
  return <div className={'flex flex-col gap-4'}>
    {Children.toArray(songs.map(song => (
      <SongItem
        song={song}
        onDelete={onItemDelete}
      />
    )))}
  </div>
})

interface SongItemProps {
  song: ISong,
  onDelete: (id: string) => void
}

const SongItem = memo(({ song, onDelete }: SongItemProps) => {
  return <div className={'flex-between items-center gap-4 hover:bg-bg-300 rounded-md py-2 px-3'}>
    <div className={'w-full flex gap-4 cursor-pointer'}>
      <Image
        src={song.thumb}
        alt={song.name}
        shape={'rounded'}
        className={'w-[100px] h-[100px] object-cover'}
      />

      <div className={'flex flex-col'}>
        <p className={'font-bold'}>{song.name}</p>
        <p>{song.owner?.username}</p>
        <p className={'text-gray'}>{new Date(song.createdAt).toLocaleDateString('vi-VN')}</p>
      </div>
    </div>

    <div className={'flex gap-4'}>
      <Button
        onClick={() => onDelete(song._id)}
      >Delete</Button>
    </div>
  </div>
})

export default MusicsManagement
