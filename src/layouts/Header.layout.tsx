import React, { ReactNode, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Image } from "@/components/elements";
import { useAuth, useClickOutside } from "@/hooks";
import { ChevronDownFilledIcon, NotificationFilledIcon } from "@/assets/icons/filled";

export const HeaderLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [isNotificationOpened, setIsNotificationOpened] = useState<boolean>(false)
  const notificationRef = useRef<HTMLSpanElement>(null)
  const user = useAuth()

  const toggleNotification = () => {
    setIsNotificationOpened(!isNotificationOpened)
  }

  useClickOutside(notificationRef, () => {
    setIsNotificationOpened(false)
  })

  return <header className={`flex pb-8 text-white ${children ? 'justify-between' : 'justify-end'}`}>
    {children}

    <div className={`hidden items-center gap-4 md:flex`}>
      <span
        className={'p-2 rounded-full bg-bg-300 cursor-pointer relative duration-300'}
        onClick={toggleNotification}
        ref={notificationRef}
      >
        <span><NotificationFilledIcon className={'origin-top animate-shake'} color={'white'} width={25} height={25}/></span>
        <span
          className={`absolute rounded-full flex items-center justify-center w-3 h-3 top-0 right-0`}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>

        {isNotificationOpened && <div
            className={`absolute top-full left-1/2 -translate-x-1/2 z-[1] flex flex-col bg-bg-300 rounded-lg overflow-hidden shadow-xl border border-solid border-[#fff5]`}>
          {[1, 2, 3, 4, 5].map(item => <NotificationItem key={item}/>)}
        </div>}
      </span>

      <Link to={'/dashboard/profile'}>
        <Image src={user?.avatar} shape={'circle'} className={`w-10 cursor-pointer duration-300 hover:opacity-70`}/>
      </Link>

      <p
        className={`inline-flex items-center gap-2 cursor-pointer border duration-300 px-4 py-2 rounded-md border-[transparent] hover:border-white`}>
        <span className={`select-none text-[12px] sm:text-sm md:text-md lg:text-lg`}>{user?.username}</span>
        <span><ChevronDownFilledIcon color={'white'} width={20} height={20}/></span>
      </p>
    </div>
  </header>
}

const NotificationItem = () => {
  return <div className={`min-w-52 max-w-72 w-full px-4 py-2 duration-300 hover:bg-[#fff1]`}>
    <span className={'line-clamp-2'}>You have a new notification</span>
  </div>
}
