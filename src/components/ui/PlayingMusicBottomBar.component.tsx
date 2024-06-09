import React, { useContext, useEffect, useState } from "react";
import { Image } from "@/components/elements";
import {
  HeartFilledIcon,
  NextFilledIcon,
  PauseFilledIcon,
  PlayFilledIcon,
  PrevFilledIcon
} from "@/assets/icons/filled";
import { RandomIcon } from "@/assets/icons";
import {
  HeartOutlinedIcon,
  RepeatOneOutlinedIcon,
  RepeatOutlinedIcon,
  VolumeLoudOutlinedIcon
} from "@/assets/icons/outlined";
import { AppContext } from "@/context";
import { globalColor, secondsToTime } from "@/utils";
import { defaultAvatar } from "@/config";

export const PlayingMusicBottomBar: React.FC = () => {
  const { isPlaying, setIsPlaying, repeatType, toggleRepeatType, isRandom, setIsRandom, isPlayerShow } = useContext(AppContext)
  const [count, setCount] = useState(0)
  const [isCurrentFavorite, setIsCurrentFavorite] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    if (count >= 100) return
    const timeout = setTimeout(() => {
      setCount(count => count + 1)
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [count, isPlaying])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCount(+value)
  }

  const toggleFavorite = () => {
    setIsCurrentFavorite(!isCurrentFavorite)
  }

  return <div
    className={`flex-between items-center duration-300 p-6 fixed bottom-0 left-0 w-full h-[100px] bg-bg-300 text-white 
    ${isPlayerShow ? 'translate-y-0' : 'translate-y-full'}`}
  >
    <div className={`h-full items-center flex gap-4`}>
      <Image
        src={defaultAvatar}
        alt={'nostalgic'}
        shape={'circle'}
        wrapperClass={`h-full aspect-square ${isPlaying ? 'animate-spin' : ''}`}
      />

      <div className="flex flex-col">
        <p className={`text-body-medium font-bold`}>Die alone</p>
        <p className={`text-body-small`}>K-391</p>
      </div>

      <span
        className={`cursor-pointer`}
        onClick={toggleFavorite}
      >
        {isCurrentFavorite ? <HeartFilledIcon width={25} height={25} className={`duration-300 ${isCurrentFavorite ? 'text-primary' : 'text-white'}`} color={`currentColor`} /> : <HeartOutlinedIcon color={'white'} width={25} height={25} />}
      </span>
    </div>

    {/*Control*/}
    <div className="flex gap-8">
      <div className={`flex items-center gap-2`}>
        <span className={`icon`}>
          <PrevFilledIcon/>
        </span>
        <span
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying ? <PlayFilledIcon/> : <PauseFilledIcon/>}
        </span>
        <span className={`icon`}>
          <NextFilledIcon/>
        </span>
      </div>
      <div className={`items-center gap-2 hidden md:flex`}>
        <span className={`text-body-small`}>{secondsToTime(count)}</span>
        <input
          className={`sm:w-[100px] md:w-[250px] lg:w-[350px] bg-bg-300 accent-secondary`}
          type="range"
          value={count}
          onChange={onChange}
          min={0}
          max={100}
          aria-orientation={'vertical'}
        />
        <span>01:40</span>
      </div>
      <div className={`hidden lg:flex gap-4`}>
        <span
          className={`icon`}
          onClick={() => setIsRandom(!isRandom)}
        >
          <RandomIcon color={isRandom ? globalColor.secondary : 'white'}/>
        </span>
        <span
          className={`icon`}
          onClick={toggleRepeatType}
        >
          {repeatType === 'repeat-one'
            ? <RepeatOneOutlinedIcon color={globalColor.secondary} />
            : <RepeatOutlinedIcon color={repeatType === 'none' ? 'white' : globalColor.secondary} />}
        </span>
        <span className={`icon`}>
          <VolumeLoudOutlinedIcon color={'white'}  />
        </span>
        <input type="range" className={'w-[100px] accent-secondary hidden xl:block'} />
      </div>
    </div>

  </div>
}
