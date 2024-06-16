import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { deletePlaylist, getPlaylists } from "@/services";
import { IPlaylist } from "@/interfaces";
import { ErrorResponse } from "@/utils";
import { HeaderLayout } from "@/layouts";
import { PlaylistIcon } from "@/assets/icons";
import { useAuth } from "@/hooks";
import { DeleteOutlinedIcon } from "@/assets/icons/outlined";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "@/assets/icons/filled";

interface LoadingProps {
  fetching: boolean
  deleting: boolean
}

const initialLoadingProps: LoadingProps = {
  deleting: false,
  fetching: true
}

const Playlists = () => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([])
  const [loading, setLoading] = useState<LoadingProps>(initialLoadingProps)

  const handleDeletePlaylist = useCallback(async (playlistId: string) => {
    const response = await deletePlaylist(playlistId)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
    } else {
      const newPlaylists = playlists.filter(playlist => playlist._id !== playlistId)
      setPlaylists(newPlaylists)
    }
  }, [playlists])

  useEffect(() => {
    (async () => {
      const response = await getPlaylists()
      if (response instanceof ErrorResponse) {
        toast.error(response.error)
      } else {
        const allPlaylist = response.data
        allPlaylist && setPlaylists(allPlaylist)
      }
      setLoading({ ...loading, fetching: false })
    })()
  }, [])

  return <div>
    <HeaderLayout>

    </HeaderLayout>
    <section>
      <h2 className={'text-title-large font-bold'}>Your playlists:</h2>
      <div className={`flex flex-col pt-8`}>
        {loading.fetching ? (
          <div className={'flex-center'}>
            <LoadingIcon width={50} height={50} />
          </div>
        ) : (
          playlists.map(playlist => <PlaylistItem key={playlist._id} playlist={playlist}
                                                  onDelete={handleDeletePlaylist} />
          ))}
      </div>
    </section>
  </div>
}

interface PlaylistItemProps {
  playlist: IPlaylist
  onDelete: (id: string) => Promise<void>
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist, onDelete }) => {
  const [loading, setLoading] = useState<LoadingProps>({
    deleting: false,
    fetching: false
  })
  const { name, _id } = playlist
  const { username } = useAuth()!
  const navigate = useNavigate()

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>, id: string) => {
    (async () => {
      e.stopPropagation()
      setLoading(prevState => ({ ...prevState, deleting: true }))
      await onDelete(id)
      setLoading(prevState => ({ ...prevState, deleting: false }))
    })()
  }

  return <div
    onClick={() => navigate(_id)}
    className={'px-4 py-2 duration-300 hover:bg-bg-300 rounded-lg cursor-pointer flex-between items-center'}
  >
    <div className={`flex gap-4`}>
      <span>
        <PlaylistIcon width={40} height={40} />
      </span>
      <div className={`flex flex-col`}>
        <span className={'text-body-small font-medium'}>{name}</span>
        <span className={'text-body-small text-gray'}>{username}</span>
      </div>
    </div>

    <div className={'flex'}>
      <span
        onClick={(e) => handleDelete(e, _id)}
      >
        {loading.deleting ? (
          <LoadingIcon />
        ) : (
          <DeleteOutlinedIcon color={'currentColor'} className={`hover:text-secondary duration-300`} />
        )}
      </span>
    </div>
  </div>
}

export default Playlists
