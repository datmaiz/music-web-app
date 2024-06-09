import {Image} from "../elements";
import {loginBackground} from "../../assets/images";
import {HeartFilledIcon, VerticalThreeDotsFilledIcon} from "@/assets/icons/filled";
import {HeartOutlinedIcon} from "@/assets/icons/outlined";

export const SongItem = ({ className = '', isFavorite = false }) => {
  return <div className={`grid gap-4 
  grid-cols-[1fr_150px]
  md:grid-cols-[1fr_100px_150px]
  lg:grid-cols-[1fr_200px_100px_150px]
  2xl:grid-cols-[1fr_300px_300px_100px_150px]
  items-center cursor-pointer duration-300 hover:bg-bg-300 p-4 rounded-lg ${className}`}>
    <div className="flex">
      <Image shape={'circle'} wrapperClass={`w-10 shrink-0`} src={loginBackground} />

      <div className="flex flex-col ml-2 min-w-0">
        <p className="text-md truncate font-bold">Muon roi ma sao con</p>
        <p className="text-sm text-gray truncate">Son Tung</p>
      </div>
    </div>
    <p className="hidden px-2 text-right 2xl:block">4.286.762</p>
    <p className="truncate px-2 hidden md:block">1 + 2</p>
    <p className="text-right hidden lg:block">4:32</p>
    <div className="flex items-center justify-end gap-8 px-4">
      {isFavorite ? <HeartFilledIcon color={'red'} /> : <HeartOutlinedIcon color={'white'} />}
      <VerticalThreeDotsFilledIcon color={'white'} />
    </div>
  </div>
}
