import {Image} from "../elements";
import React from "react";

interface IPlaylistCardProps {
  thumb: string,
  name: string,
  authors: string[],
  className?: string,
}

export const PlaylistCard: React.FC<IPlaylistCardProps> = (
  {
    thumb,
    name,
    authors,
    className
  }
) => {
  return <article
    className={`relative text-white overflow-hidden rounded-xl cursor-pointer duration-500 hover:opacity-70 shadow-xl shadow-black ${className}`}
  >
    <Image
      src={thumb}
      shape={'rounded'}
      className={'select-none h-full w-[250px] aspect-square object-cover'}
    />
    <div className={`absolute bottom-0 left-0 w-full px-4 py-2 backdrop-blur-md`}>
      <p className={`text-title-small font-bold truncate`}>{name}</p>
      <p className="text-body-medium truncate">{authors.join(', ')}</p>
    </div>
  </article>
}
