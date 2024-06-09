import React, {useState} from "react";

import {HeaderLayout} from "@/layouts";
import {Input} from "@/components/elements";
import {searchTags} from "@/config";
import {PlaylistCard} from "@/components/ui";
import {SearchOutlinedIcon} from "@/assets/icons/outlined";
import {CloseFilledIcon} from "@/assets/icons/filled";
import {ISearchTag} from "@/interfaces";
import {useLocalStorage} from "@/hooks";
import {randomId} from "@/utils";

export const Search = () => {
  const { setItem, getItem } = useLocalStorage()
  const [search, setSearch] = useState<string>("")
  const [recentSearchTags, setRecentSearchTags] = useState<ISearchTag[]>(getItem('recentSearchTags') ?? [])

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(value)
  }

  const deleteRecentSearchTags = (id: string) => {
    const removedSearchTags = recentSearchTags.filter((tag) => tag.id !== id)
    setRecentSearchTags(removedSearchTags)
    setItem('recentSearchTags', removedSearchTags)
  }

  const searchMusic = () => {
    if (!search) return
    const newRecentSearchTags = [...recentSearchTags, { id: randomId(), tagName: search }]
    setRecentSearchTags(newRecentSearchTags)
    setItem<ISearchTag[]>('recentSearchTags', newRecentSearchTags)
    setSearch('')
  }

  return <section className={`text-white`}>
    <HeaderLayout>
      <div className="flex items-center gap-2">
        <Input
          placeholder={`Search`}
          value={search}
          onValueChange={onSearchChange}
          sizeof={'full'}
          className={`bg-bg-300 border-0 max-w-2xl flex-1`}
        />

        <span
          className={`p-2 rounded-full bg-bg-300 cursor-pointer`}
          onClick={searchMusic}
        >
          <SearchOutlinedIcon color={'white'} width={25} height={25}/>
        </span>
      </div>
    </HeaderLayout>

    <section className={'flex items-center gap-2 overflow-x-auto snap-mandatory scroll-hidden'}>
      {searchTags.map(tag => (
        <p key={tag}
           className={`text-sm md:text-base py-2 px-4 cursor-pointer shrink-0 rounded-full bg-bg-300`}
        >{tag}
        </p>))}
    </section>

    <section>
      <h2 className={`text-title-medium py-8`}>Recent Search</h2>
      <div className="flex items-center gap-2 overflow-x-auto scroll-hidden snap-mandatory">
        {recentSearchTags.map((item) => (
          <p key={item.id} className={`flex items-center shrink-0 gap-2 py-2 px-4 bg-bg-300 rounded-full cursor-pointer`}>
            <span className={`text-sm md:text-base`}>{item.tagName}</span>
            <span
              onClick={() => deleteRecentSearchTags(item.id)}
              className={`p-1 rounded-full duration-300 hover:bg-[#fff5]`}
            >
              <CloseFilledIcon height={20} width={20} color={'white'} />
            </span>
          </p>
        ))}
      </div>
    </section>

    <section>
      <h2 className={`py-8 text-title-medium`}>Recent Played</h2>
      <div className="flex items-center gap-6 overflow-x-auto scroll-hidden snap-mandatory">
        {[1, 2, 3, 4, 5, 6, 7].map(item => (
          <PlaylistCard
            key={item}
            thumb={`data:image/jpeg;base64,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`}
            name={`Die Alone`}
            authors={['K-97', 'K-ICM']}
            className={`shrink-0 aspect-square snap-center`}
          />
        ))}
      </div>
    </section>
  </section>
}
