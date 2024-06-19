import { ChangeEvent, FC, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  HeartOutlinedIcon, MutedOutlinedIcon,
  RepeatOneOutlinedIcon,
  RepeatOutlinedIcon,
  VolumeLoudOutlinedIcon
} from "@/assets/icons/outlined";
import { AppContext } from "@/context";
import { globalColor, secondsToTime } from "@/utils";
import { defaultAvatar } from "@/config";

export const PlayingMusicBottomBar: FC = () => {
  const {
    isPlaying,
    setIsPlaying,
    repeatType,
    toggleRepeatType,
    isRandom,
    setIsRandom,
    isPlayerShow
  } = useContext(AppContext)
  const [isCurrentFavorite, setIsCurrentFavorite] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(100)
  const [muted, setMuted] = useState(false)

  const ref = useRef<HTMLAudioElement>(null)
  const { songs, currentSong, setCurrentSong } = useContext(AppContext)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (ref?.current) {
      ref.current.currentTime = +value
      setCurrentTime(+value)
    }
  }

  const toggleFavorite = () => {
    setIsCurrentFavorite(!isCurrentFavorite)
  }

  const togglePlayAndPause = async () => {
    if (!isPlaying) {
      await ref?.current?.play()
    } else {
      ref?.current?.pause()
    }
    setIsPlaying(!isPlaying)
  }

  const nextSong = async () => {
    if (currentSong == songs.length - 1) return
    setCurrentSong(currentSong + 1)
    await ref?.current?.play()
  }

  const prevSong = () => {
    if (currentSong == 0) return
    setCurrentSong(currentSong - 1)
  }

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (ref.current) {
      setVolume(e.target.valueAsNumber)
      if (e.target.valueAsNumber === 0) setMuted(true)
      else setMuted(false)
    }
  }

  const toggleMuted = () => {
    if (ref.current) {
      ref.current.muted = !muted
      setMuted(!muted)
    }
  }

  useEffect(() => {
    (async () => {
      console.log("effect")

      if (ref.current) {
        setIsPlaying(true)
        await ref.current.play()
      }
    })()
  }, [currentSong]);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.volume = volume / 100
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('timeupdate', () => {
        const currentTime = ref?.current?.currentTime || 0
        const duration = ref?.current?.duration || 0
        if (currentTime === duration && duration !== 0) {
          const nextSong = currentSong + 1
          setCurrentSong(nextSong)
          setCurrentTime(0)
          ref.current && (ref.current.currentTime = 0)
        } else {
          setCurrentTime(currentTime)
        }
      })
    }
  }, []);

  return <div
    className={`flex-between items-center duration-300 p-6 fixed bottom-0 left-0 w-full h-[100px] bg-bg-300 text-white 
    ${isPlayerShow ? 'translate-y-0' : 'translate-y-full'}`}
  >
    <audio
      ref={ref}
      src={songs[currentSong]?.songUrl ?? ''}
    />
    <div className={`h-full items-center flex gap-4`}>
      <Image
        src={songs[currentSong]?.thumb ?? defaultAvatar}
        alt={songs[currentSong]?.name}
        shape={'circle'}
        className={'object-cover'}
        wrapperClass={`h-full aspect-square ${isPlaying ? 'animate-spin' : ''}`}
      />

      <div className="flex flex-col">
        <p className={`text-body-medium font-bold`}>{songs[currentSong]?.name}</p>
        <p className={`text-body-small`}>{songs[currentSong]?.presentations.join(' ft ').substring(0, 20)}</p>
      </div>

      <span
        className={`cursor-pointer`}
        onClick={toggleFavorite}
      >
        {isCurrentFavorite ? (
          <HeartFilledIcon
            width={25}
            height={25}
            className={`duration-300 ${isCurrentFavorite ? 'text-primary' : 'text-white'}`}
            color={`currentColor`} />
        ) : (
          <HeartOutlinedIcon color={'white'} width={25} height={25} />
        )}
      </span>
    </div>

    {/*Control*/}
    <div className="flex gap-8">
      <div className={`flex items-center gap-2`}>
        <span
          onClick={prevSong}
          className={`icon`}
        >
          <PrevFilledIcon />
        </span>
        <span
          onClick={togglePlayAndPause}
        >
          {!isPlaying ? <PlayFilledIcon /> : <PauseFilledIcon />}
        </span>
        <span
          onClick={nextSong}
          className={`icon`}
        >
          <NextFilledIcon />
        </span>
      </div>
      <div className={`items-center gap-2 hidden md:flex`}>
        <span className={`text-body-small`}>{secondsToTime(currentTime)}</span>
        <input
          className={`sm:w-[100px] md:w-[250px] lg:w-[350px] bg-bg-300 accent-secondary`}
          type="range"
          value={currentTime}
          onChange={onChange}
          min={0}
          max={ref?.current?.duration || 0}
          aria-orientation={'vertical'}
        />
        <span>{secondsToTime(ref?.current?.duration || 0)}</span>
      </div>
      <div className={`hidden lg:flex gap-4`}>
        <span
          className={`icon`}
          onClick={() => setIsRandom(!isRandom)}
        >
          <RandomIcon color={isRandom ? globalColor.secondary : 'white'} />
        </span>
        <span
          className={`icon`}
          onClick={toggleRepeatType}
        >
          {repeatType === 'repeat-one'
            ? <RepeatOneOutlinedIcon color={globalColor.secondary} />
            : <RepeatOutlinedIcon color={repeatType === 'none' ? 'white' : globalColor.secondary} />}
        </span>
        <span
          onClick={toggleMuted}
          className={`icon`}
        >
          {muted ? (
            <MutedOutlinedIcon color={'white'} />
          ) : (
            <VolumeLoudOutlinedIcon color={'white'} />
          )}
        </span>
        <input
          value={volume}
          min={0}
          max={100}
          onChange={handleVolumeChange}
          type="range"
          className={'w-[100px] accent-secondary hidden xl:block'}
        />
      </div>
    </div>

  </div>
}
