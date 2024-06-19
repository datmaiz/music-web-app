import { Suspense, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { SidebarLayout } from "@/layouts/Sidebar.layout.tsx";
import { Menu } from "@/assets/icons";
import { PlayingMusicBottomBar, ScrollToTopButtonComponent } from "@/components/ui";
import { AppContext } from "@/context";
import { globalColor, pathOfRoutes } from "@/utils";
import { adminMenus, clientMenus } from "@/config";
import { useAuth } from "@/hooks";
import { ChevronUpFilledIcon, LoadingIcon } from "@/assets/icons/filled";

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window && window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export const Layout = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true)
  const { isPlayerShow } = useContext(AppContext)

  const user = useAuth()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpened(!isSidebarOpened)
  }

  useEffect(() => {
    if(user?.isAdmin) {
      navigate(`admin/${pathOfRoutes.USER_MANAGEMENT}`)
    } else if (!user?.isAdmin) {
      navigate(pathOfRoutes.DASHBOARD)
    } else {
      navigate(pathOfRoutes.LOGIN)
    }
  }, []);

  return <div className={'h-dvh bg-bg'}>
    <ScrollToTop />

    <div className={`flex h-full`}>
      <div
        className={`duration-1000 border-r border-[#999] relative ${isSidebarOpened ? 'flex-1' : 'w-0'}`}>
        <SidebarLayout
          isOpened={useMemo(() => isSidebarOpened, [isSidebarOpened])}
          menus={user?.isAdmin ? adminMenus : clientMenus}
        />
        <span
          onClick={toggleSidebar}
          className={`absolute top-0 left-full p-2 border border-[#999] rounded-r-lg cursor-pointer bg-[#fff1] z-[99] lg:hidden`}
        >
            <Menu color={globalColor.secondary} />
        </span>
      </div>
      <div
        ref={containerRef}
        className={`flex-[5] p-6 overflow-y-auto text-white ${isPlayerShow ? 'pb-[100px]' : ''}`}
      >
        <Suspense fallback={<div className={'w-full h-dvh flex-center'}><LoadingIcon color={'white'} width={50} height={50} /></div>}>
          <div className={'scroll-watcher'}></div>
          <Outlet />
          {!user?.isAdmin && <PlayingMusicBottomBar />}
          {isPlayerShow && <div className={'h-4'}></div>}
        </Suspense>

        <ScrollToTopButtonComponent
          yOffsetToShowScroll={500}
          containerScroll={containerRef}
        >
          <ChevronUpFilledIcon />
        </ScrollToTopButtonComponent>
      </div>

    </div>
  </div>
}
