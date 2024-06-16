import React, { Children, memo, useState } from "react";

import { HeaderLayout } from "@/layouts";
import { Image, Input } from "@/components/elements";
import { SearchOutlinedIcon } from "@/assets/icons/outlined";
import { CloseFilledIcon, LoadingIcon } from "@/assets/icons/filled";
import { ISearchResult, IUser } from "@/interfaces";
import { useLocalStorage } from "@/hooks";
import { ErrorResponse } from "@/utils";
import { search } from '@/services/apis'
import { toast } from "react-toastify";
import { PlaylistCard } from "@/components/ui";

interface LoadingProps {
  searching: boolean
}

const initialLoadingProps: LoadingProps = {
  searching: false,
}

const initialResult: ISearchResult = {
  songs: [],
  users: []
}

export const Search = () => {
  const { setItem, getItem } = useLocalStorage()
  const [searchTerm, setSearch] = useState<string>("")
  const [recentSearchTags, setRecentSearchTags] = useState<string[]>(() => getItem<string[]>('recentSearchTags') ?? [])
  const [loading, setLoading] = useState<LoadingProps>(initialLoadingProps)
  const [results, setResults] = useState<ISearchResult>(initialResult)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(value)
  }

  const deleteRecentSearchTags = (item: string) => {
    const removedSearchTags = recentSearchTags.filter((tag) => tag !== item)
    setRecentSearchTags(removedSearchTags)
    setItem<string[]>('recentSearchTags', removedSearchTags)
  }

  const searchMusic = async (searchText: string) => {
    if (!searchText) return
    setLoading({...loading, searching: true})

    const response = await search(searchText)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
    } else {
      const data = response.data
      data && setResults(data)
    }

    setLoading({...loading, searching: false})
    const newRecentSearchTags = [...new Set([...recentSearchTags, searchText])]
    setRecentSearchTags(newRecentSearchTags)
    setItem<string[]>('recentSearchTags', newRecentSearchTags)
    setSearch('')
  }

  const handleSearchTagClick = async (search: string) => {
    setSearch(() => search)
    await searchMusic(search)
  }

  return <section className={`text-white`}>
    <HeaderLayout>
      <div className="flex items-center gap-2">
        <Input
          autoFocus={true}
          placeholder={`Search`}
          value={searchTerm}
          onValueChange={onSearchChange}
          sizeof={'full'}
          className={`bg-bg-300 border-0 max-w-2xl flex-1`}
        />

        <span
          className={`p-2 rounded-full bg-bg-300 cursor-pointer`}
          onClick={() => searchMusic(searchTerm)}
        >
          <SearchOutlinedIcon color={'white'} width={25} height={25}/>
        </span>
      </div>
    </HeaderLayout>

    <section>
      {recentSearchTags.length > 0 && <h2 className={`text-title-medium py-8`}>Recent Search:</h2>}
      <div className="flex items-center gap-2 overflow-x-auto scroll-hidden snap-mandatory">
        {Children.toArray(recentSearchTags.map((item) => (
          <p
            className={`flex items-center shrink-0 gap-2 py-2 px-4 bg-bg-300 rounded-full cursor-pointer`}
          >
            <span
              onClick={() => handleSearchTagClick(item)}
              className={`text-sm md:text-base`}
            >{item}
            </span>
            <span
              onClick={() => deleteRecentSearchTags(item)}
              className={`p-1 rounded-full duration-300 hover:bg-[#fff5]`}
            >
              <CloseFilledIcon height={20} width={20} color={'white'} />
            </span>
          </p>
        )))}
      </div>
    </section>

    {
      loading.searching ? (
        <div className={'flex-center'}>
          <LoadingIcon width={50} height={50} />
        </div>
      ) : (
        <>
          <section>
            {results.users.length > 0 && <h2 className={'text-title-medium py-8'}>Users:</h2>}
            <div className="flex items-center gap-4 overflow-x-auto scroll-hidden snap-mandatory">
              {Children.toArray(results.users.map((user) => (
                <UserCard
                  user={user}
                />
              )))}
            </div>
          </section>
          <section>
            {results.users.length > 0 && <h2 className={'text-title-medium py-8'}>Songs:</h2>}
            <div className="flex items-center gap-4 overflow-x-auto scroll-hidden snap-mandatory">
              {Children.toArray(results.songs.map((song) => (
                <PlaylistCard
                  thumb={song.thumb}
                  name={song.name}
                  authors={song.presentations}
                />
              )))}
            </div>
          </section>
        </>
      )
    }

  </section>
}

interface UserCardProps {
  user: IUser
}

const UserCard: React.FC<UserCardProps> = memo(({ user }) => {
  return <div className={'flex flex-col gap-4 w-[100px]'}>
    <Image
      src={user.avatar}
      alt={user.username}
      wrapperClass={'w-[100px] h-[100px] rounded-full overflow-hidden cursor-pointer hover:opacity-80 duration-300'}
      className={'w-full h-full'}
    />

    <p className={'text-body-small truncate'}>{user.username}</p>
  </div>
})
