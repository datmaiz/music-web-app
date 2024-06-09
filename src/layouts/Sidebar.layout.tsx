import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { IMenuItem, IPlaylist } from "@/interfaces";
import { PlusIcon } from "@/assets/icons";
import { CloseFilledIcon, LoadingIcon, Logo, SettingIcon } from "@/assets/icons/filled";
import { LogoutOutlinedIcon } from "@/assets/icons/outlined";
import { AppContext } from "@/context";
import { ErrorResponse, globalColor, pathOfRoutes, randomId } from "@/utils";
import { useAuth, useLocalStorage, useSessionStorage } from "@/hooks";
import { createPlaylist, getPlaylistsByOwnerId } from "@/services";

interface SidebarProps {
  isOpened: boolean,
  menus: IMenuItem[]
}

interface LoadingProps {
  loadingPlaylist: boolean
}

const initialLoadingState: LoadingProps = {
  loadingPlaylist: true,
}

export const SidebarLayout: React.FC<SidebarProps> = ({ menus }) => {
  const [playlist, setPlaylist] = useState<IPlaylist[]>([])
  const [isInputShow, setIsInputShow] = useState<boolean>(false)
  const [loading, setLoading] = useState<LoadingProps>(initialLoadingState)
  const [playlistName, setPlaylistName] = useState<string>("")

  const { pathname } = useLocation()
  console.log("SIDEBAR - RE-RENDER")
  const { isPlayerShow } = useContext(AppContext)
  const user = useAuth()
  const navigate = useNavigate()
  const { removeItem: removeFromLocal } = useLocalStorage()
  const { removeItem: removeFromSession } = useSessionStorage()

  const onPlayListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPlaylistName(value)
  }

  const handleAddPlaylist = () => {
    (async () => {
      if (!playlistName) {
        toast.warning('Playlist must have a name')
        setLoading({ ...loading, loadingPlaylist: false })
        return
      }

      setPlaylist([...playlist, { _id: randomId(), name: playlistName, songs: [], ownerId: user?._id || '' }])

      const response = await createPlaylist({ ownerId: user?._id, name: playlistName })
      if (response instanceof ErrorResponse) {
        toast.error(response.error)
      }
    })()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    if (key.toLowerCase() === 'enter') {
      handleAddPlaylist()
      setPlaylistName('')
      setIsInputShow(false)
    }
  }

  const logout = () => {
    removeFromSession('user')
    removeFromLocal('user')
    navigate(pathOfRoutes.LOGIN)
  }

  useEffect(() => {
    (async () => {
      if (user?.isAdmin) return
      const response = await getPlaylistsByOwnerId(user?._id ?? '')

      if (response instanceof ErrorResponse) {
        toast.error(response.error)
        return
      }

      response.data && setPlaylist(response.data)
      setLoading({ ...loading, loadingPlaylist: false })
    })()
  }, [])

  return <aside
    className={`flex flex-col justify-between py-4 h-full text-white overflow-hidden duration-1000 ${isPlayerShow ? 'pb-[100px]' : ''}`}>
    <div className={`flex flex-col`}>
      <span className={'flex justify-center p-4'}>
        <Logo color={'orange'} />
      </span>

      <p className={`p-2`}>
        <span className={`text-body-small hidden lg:block`}>Menu</span>
      </p>

      <div>
        {menus.map(item => (
          <MenuItem key={item.path} item={item} pathname={pathname} />
        ))}
      </div>

      {!user?.isAdmin && (
        <div className={`flex flex-col gap-2`}>
          <p className={`p-2 flex items-center justify-center lg:justify-between`}>
            <span className={`text-body-small hidden lg:block`}>Play list</span>
            <span
              className={`p-1 rounded-full cursor-pointer duration-300 hover:bg-bg-300`}
              onClick={() => setIsInputShow(true)}
            >
            <PlusIcon color={'white'} width={20} height={20} />
          </span>
          </p>
          {isInputShow && (
            <div className={`px-2 flex gap-2`}>
              <input
                type={'text'}
                placeholder={'Enter playlist name'}
                value={playlistName}
                autoFocus={true}
                onChange={onPlayListChange}
                onKeyDown={onKeyDown}
                className={'bg-[#fff0] border border-[#999] rounded-lg px-4 py-2 w-full outline-none'}
              />
              <span
                className={' flex items-center'}
                onClick={() => setIsInputShow(false)}
              >
                <CloseFilledIcon color={'white'} width={20} height={20} />
              </span>
            </div>)}
          {loading.loadingPlaylist ? (
            <span className={'w-full flex-center'}>
              <LoadingIcon />
            </span>
          ) : (<div className={`flex flex-col overflow-y-auto`}>
            {playlist.slice(0, 4).map(item => (
              <Link
                to={`/dashboard/playlist/${item._id}`}
                key={item._id}
                className={`p-4 rounded-lg duration-300 hover:bg-bg-300 cursor-pointer font-bold flex-between items-center`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            {playlist.length > 4 ? (
              <Link
                to={'/dashboard/playlist'}
                className={`p-4 cursor-pointer text-center duration-300 hover:bg-bg-300`}
              >See all playlist</Link>) : ''}
          </div>)}
        </div>
      )}
    </div>

    <div className={`flex flex-col`}>
      {!user?.isAdmin && (
        <Link
          to={'/dashboard/settings'}
          className={`flex items-center gap-2 text-lg font-bold px-4 py-4 relative duration-300 hover:bg-bg-300 hover:text-secondary justify-center lg:justify-start group
            ${pathname === '/dashboard/settings' ? 'text-secondary bg-bg-300' : 'text-white'}`}
        >
          <span className={`flex-1 hidden lg:inline`}>Settings</span>
          <span>
            <SettingIcon color={pathname === '/dashboard/settings' ? globalColor.secondary : 'white'} />
          </span>
          <span
              className={`w-1 h-full rounded-full absolute right-0 duration-300 lg:hidden  group-hover:bg-primary 
              ${pathname === '/dashboard/settings' ? 'bg-primary' : ''}`}
          ></span>
      </Link>)}
      <div
        className={`flex items-center gap-2 text-lg font-bold px-4 py-4 relative duration-300 hover:text-primary hover:bg-bg-300 justify-center lg:justify-start group cursor-pointer`}
        onClick={logout}
      >
        <span
          className={`flex-1 hidden lg:inline text-primary`}
        >Logout</span>
        <LogoutOutlinedIcon color={globalColor.secondary} />
        <span
          className={`w-1 h-full rounded-full absolute right-0 duration-300 lg:hidden group-hover:bg-primary`}
        ></span>
      </div>
    </div>
  </aside>
}

const MenuItem: React.FC<{ item: IMenuItem, pathname: string }> = ({ item, pathname }) => {
  return (
    <Link
      to={item.path}
      className={`flex items-center gap-2 text-lg font-bold px-4 py-4 relative duration-300 hover:text-secondary hover:bg-bg-300 justify-center lg:justify-start group
              ${pathname === item.path ? 'text-secondary bg-bg-300' : 'text-white'}`}
    >
      <span className={`flex-1 hidden lg:inline truncate`}>{item.title}</span>
      {/*{color: pathname === item.path ? '#e58a2b' : 'white', size: 32, strokeWidth: 2}*/}
      {item.icon({ color: pathname === item.path ? globalColor.secondary : 'white' })}
      <span
        className={`w-1 h-full rounded-full absolute right-0 duration-300 lg:hidden  group-hover:bg-primary 
        ${pathname === item.path ? 'bg-primary' : ''}`}
      ></span>
    </Link>)
}
