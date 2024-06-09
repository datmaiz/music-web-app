import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { IParam } from "@/interfaces/IParam.ts";
import { getPlaylist } from "@/services";
import { ErrorResponse } from "@/utils";
import { IPlaylist } from "@/interfaces";
import { LoadingIcon } from "@/assets/icons/filled";
import { HeaderLayout } from "@/layouts";
import { useAuth } from "@/hooks";

interface LoadingProps {
  loading: boolean
}

const PlayList = () => {
  const [playlist, setPlaylist] = useState<IPlaylist>()
  const [loading, setLoading] = useState<LoadingProps>({
    loading: true,
  })
  const { playlistId } = useParams<Partial<IParam>>()
  const user = useAuth()!

  useEffect(() => {
    (async () => {
      if (!playlistId) return
      const response = await getPlaylist(playlistId)
      setLoading(prevState => ({ ...prevState, loading: false }))
      if (response instanceof ErrorResponse) {
        toast.error(response.error)
        return
      }

      setPlaylist(response.data)
    })()
  }, [])

  if (loading.loading) return <div className={'w-full h-full flex-center'}>
    <LoadingIcon width={50} height={50} />
  </div>

  return <div>
    <HeaderLayout />
    <section>
      <h2 className={'text-title-large font-bold uppercase'}>{playlist?.name}</h2>
      <p className={'pt-2 text-title-small'}>{user.username}</p>
      <p className={'pt-2 text-body-medium'}>{playlist?.songs?.length} songs • {playlist?.songs?.reduce((acc, cur) => acc + cur.duration, 0)} minutes</p>
    </section>
  </div>
}

export default PlayList
