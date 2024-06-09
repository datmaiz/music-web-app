import React, { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ChevronRightFilledIcon, LoadingIcon, MusicFilledIcon } from "@/assets/icons/filled";
import { AlbumOutlinedIcon, ChartOutlinedIcon, UploadOutlinedIcon } from "@/assets/icons/outlined";
import { HeaderLayout } from "@/layouts";
import { PlaylistCard } from "@/components/ui";
import { PlaylistIcon } from "@/assets/icons";
import { ErrorResponse, pathOfRoutes } from "@/utils";
import { IFavorite, IPlaylist, ISong } from "@/interfaces";
import { getPlaylists, getSongs } from "@/services";

interface LoadingProps {
  loading: boolean
}

interface OverviewProps {
  favorites: IFavorite[]
  uploads: ISong[]
  playlists: IPlaylist[]
}

const initialLoadingState: LoadingProps = {
  loading: true
}

const initialOverviewState: OverviewProps = {
  favorites: [],
  playlists: [],
  uploads: []
}

export const MyMusic = () => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState<LoadingProps>(initialLoadingState)
  const [overview, setOverview] = useState<OverviewProps>(initialOverviewState)
  const navigate = useNavigate();

  console.log("MY MUSIC - RE-RENDER")

  useEffect(() => {
    (async () => {
      const [playlistResponse, songResponse] = await Promise.allSettled([
        getPlaylists(),
        getSongs(),
      ])

      if (playlistResponse.status === 'fulfilled') {
        const response = playlistResponse.value
        // console.log(response)
        if (response instanceof ErrorResponse) toast.error(response.error)
        else setOverview(prevState => ({ ...prevState, playlists: response.data ? response.data : prevState.playlists }))
      }

      if (songResponse.status === 'fulfilled') {
        const response = songResponse.value
        if (response instanceof ErrorResponse) toast.error(response.error)
        else setOverview(prevState => ({ ...prevState, uploads: response.data ? response.data : prevState.uploads }))
      }

      setLoading(prevState => ({ ...prevState, loading: false }))
    })()
  }, [])

  if (loading.loading) {
    return <div className={'flex-center h-full'}><LoadingIcon width={50} height={50} /></div>
  }

  return <div>
    <HeaderLayout></HeaderLayout>
    <h2 className={`text-title-large font-bold`}>Overview</h2>
    <section className={`py-8 flex snap-mandatory overflow-x-auto scroll-hidden gap-8`}>
      <OverviewCard
        title={'Favorite music'}
        icon={<MusicFilledIcon color={'white'} width={30} height={30} />}
        number={overview.favorites.length}
        isActive={true}
        onClick={() => navigate(`/dashboard/${pathOfRoutes.FAVORITE}`)}
      />
      <OverviewCard
        title={'Uploads'}
        icon={<UploadOutlinedIcon color={'white'} width={30} height={30} />}
        number={overview.uploads.length}
        isActive={false}
        onClick={() => navigate(`/dashboard/${pathOfRoutes.UPLOAD}`)}
      />
      <OverviewCard
        title={'Playlist'}
        icon={<PlaylistIcon color={'white'} width={30} height={30} />}
        number={overview.playlists.length}
        isActive={false}
        onClick={() => navigate(`/dashboard/${pathOfRoutes.PLAYLIST}`)}
      />
      <OverviewCard
        title={'Album'}
        icon={<AlbumOutlinedIcon color={'white'} width={30} height={30} />}
        number={1234}
        isActive={false}
        onClick={() => navigate(`/dashboard/${pathOfRoutes.ALBUM}`)}
      />
    </section>

    <section className={`pt-10`}>
      <h2 className={`text-title-large font-bold`}>Recent Played</h2>
      <div className={`flex py-8 snap-mandatory overflow-x-auto scroll-hidden gap-8`}>
        <PlaylistCard className={'shrink-0'} thumb={"https://indieshark.com/wp-content/uploads/2021/02/Untitled-2.png"} name={"Die alone"} authors={['K-391']} />
        <PlaylistCard className={'shrink-0'} thumb={"https://indieshark.com/wp-content/uploads/2021/02/Untitled-2.png"} name={"Die alone"} authors={['K-391']} />
        <PlaylistCard className={'shrink-0'} thumb={"https://indieshark.com/wp-content/uploads/2021/02/Untitled-2.png"} name={"Die alone"} authors={['K-391']} />
        <PlaylistCard className={'shrink-0'} thumb={"https://indieshark.com/wp-content/uploads/2021/02/Untitled-2.png"} name={"Die alone"} authors={['K-391']} />
      </div>
    </section>

    <button onClick={() => setCount(count + 1)}>Click times {count}</button>
  </div>
}

interface OverviewCardProps {
  title: string
  icon: ReactNode
  number: number
  isActive: boolean
  onClick?: () => void
}

const OverviewCard: React.FC<OverviewCardProps> = React.memo(({ title, icon, number, isActive, onClick }) => {
  console.log(`${title} RE-RENDER`)
  return <div
    className={`${isActive ? 'gradient-primary' : 'bg-bg-300'} 
    duration-300 rounded-2xl p-3 md:p-4 xl:p-6 min-w-52 md:min-w-60 xl:min-w-72 cursor-pointer hover:opacity-80 flex-between items-center shadow-xl shadow-black`}
    onClick={onClick}
  >
    <div>
      <p className={`flex items-center gap-4 text-body-large font-medium`}>
      <span className={'p-2 rounded-xl bg-[#fff4]'}>
        {icon}
      </span>
        <span>{title}</span>
      </p>

      <p className={`text-title-large font-black pt-8`}>{number}</p>

      <p className={`flex items-end gap-2 font-medium pt-4`}>
        <ChartOutlinedIcon color={'white'} />
        <span>{~~(Math.random() * 100)}%</span>
      </p>
    </div>
    <span>
      <ChevronRightFilledIcon />
    </span>
  </div>
})
