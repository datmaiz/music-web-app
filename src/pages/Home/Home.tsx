import React from "react";
import { loginBackground } from "@/assets/images";
import { PlaylistCard, SongItem } from "@/components/ui";
import { HeaderLayout } from "@/layouts";
import { useAuth } from "@/hooks";

export const Home: React.FC = () => {
  const user = useAuth()!

  return <div className={`text-white`}>
    <HeaderLayout>
      <div>
        <h1 className={`text-title-large mb-2`}>Good {new Date().getHours() < 13 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}</h1>
        <p className={`text-[12px] md:text-sm`}>{user.username}</p>
      </div>
    </HeaderLayout>

    <section className={`bg-[#2962a3] p-6 rounded-3xl`}>
      <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold max-w-[800px] mb-4`}>
        Play the music you like, explore songs,
        <span className={`text-secondary`}>
          listen anytime and anywhere
        </span> now it's easier
      </p>
      <p className={`text-sm sm:text-md lg:text-lg`}>A new experience of listening to music at your fingertips</p>
    </section>

    <section>
      <div className={`flex justify-between py-8`}>
        <h3 className={`text-title-medium`}>Most Popular Playlist</h3>
        <span className={`text-secondary cursor-pointer font-bold`}>See more</span>
      </div>
      <div className={`flex gap-6 snap-mandatory overflow-auto scroll-hidden`}>
        {[1, 2, 3, 4, 5].map(item => (
          <PlaylistCard
            key={item}
            name={'Romance'}
            thumb={loginBackground}
            authors={['Son Tung, Den Vau, Hieu Thu Hai']}
            className={`shrink-0 aspect-square snap-center`}
          />
        ))}
      </div>
    </section>

    <section className={`w-full`}>
      <div className="flex justify-between py-8">
        <h3 className={`text-title-medium`}>Popular Music</h3>
        <span className={`text-secondary cursor-pointer font-bold`}>See more</span>
      </div>
      <div className={`flex flex-col`}>
        {[1, 2, 3, 4, 5].map(item => <SongItem key={item} isFavorite={item % 2 === 0} />)}
      </div>
    </section>
  </div>
}
