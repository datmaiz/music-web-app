import React, { ChangeEvent, Children, useCallback, useEffect, useState } from "react";

import { HeaderLayout } from "@/layouts";
import { Button, Image, Input } from "@/components/elements";
import { getPlaylistsByOwnerId, getPosts, getSongByOwnerId, updateUser, uploadFileToCloudinary } from "@/services";
import { useAuth, useKeymap, useLocalStorage, useSessionStorage } from "@/hooks";
import { IPlaylist, IPost, ISong } from "@/interfaces";
import { ErrorResponse } from "@/utils";
import { toast } from "react-toastify";
import { LoadingIcon } from "@/assets/icons/filled";
import { Post } from "@/pages/Stream";
import { LightBoxImages } from "@/components/ui";

interface MusicProfile {
  uploaded: ISong[]
  playlists: IPlaylist[]
  posts: IPost[]
}

interface LoadingProps {
  loading: boolean
  saving: boolean
}

interface LightBoxProps {
  isShow: boolean
  currentImage: number
  images: string[]
}

const initialMusicProfile: MusicProfile = {
  playlists: [],
  uploaded: [],
  posts: []
}

const initialLoadingState: LoadingProps = {
  loading: true,
  saving: false
}

const initialLightBoxState: LightBoxProps = {
  isShow: false,
  images: [],
  currentImage: 0
}

export const Profile = () => {
  const [image, setImage] = useState<File | null>(null)
  const [objectUrl, setObjectUrl] = useState<string | null>(null)
  const [musicProfile, setMusicProfile] = useState<MusicProfile>(initialMusicProfile)
  const [loading, setLoading] = useState<LoadingProps>(initialLoadingState)
  const [profile, setProfile] = useState(useAuth()!)
  const [lightBoxImages, setLightBoxImages] = useState<LightBoxProps>(initialLightBoxState)

  const user = useAuth()!
  const { getFromSessionStorage, saveToSessionStorage } = useSessionStorage()
  const { getItem, setItem } = useLocalStorage()

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files === null) return
    setImage(files?.[0])
  }

  // update and clear old objectUrl
  useEffect(() => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
    }
    setObjectUrl(image ? URL.createObjectURL(image) : null)
  }, [image])

  // call apis
  useEffect(() => {
    (async () => {
      const promises = await Promise.allSettled([
        getSongByOwnerId(user._id),
        getPlaylistsByOwnerId(user._id),
        getPosts()
      ])

      const keys = Object.keys(initialMusicProfile)
      let data: MusicProfile = musicProfile

      promises.forEach((promise, index) => {
        if (promise.status === 'fulfilled') {
          const response = promise.value
          if (response instanceof ErrorResponse) {
            toast.error(response.error)
          } else {
            data = { ...data, [keys[index]]: response.data }
          }
        }
      })

      setMusicProfile(data)
      setLoading({ ...loading, loading: false })

      // [songsResponse, playlistsResponse, postsResponse]
      // const profile = { ...musicProfile }
      // if (songsResponse.status === 'fulfilled') {
      //   const response = songsResponse.value
      //   if (response instanceof ErrorResponse) {
      //     toast.error(response.error)
      //   } else {
      //     profile.uploaded = response.data ? response.data : profile.uploaded
      //   }
      // }
      // if (playlistsResponse.status === 'fulfilled') {
      //   const response = playlistsResponse.value
      //   if (response instanceof ErrorResponse) {
      //     toast.error(response.error)
      //   } else {
      //     profile.playlists = response.data ? response.data : profile.playlists
      //   }
      //
      //   setMusicProfile(profile)
      //   setLoading({ ...loading, loading: false })
      // }
      // if (postsResponse.status === 'fulfilled') {
      //   const response = postsResponse.value
      //   if (response instanceof ErrorResponse) {
      //     toast.error(response.error)
      //   } else {
      //     setPosts(response.data ?? [])
      //     profile.posts = response.data ? response.data : profile.posts
      //   }
      //
      //   setMusicProfile(profile)
      //   setLoading({ ...loading, loading: false })
      // }
    })()
  }, [])

  useKeymap(() => {
    if (lightBoxImages.isShow) {
      setLightBoxImages({ ...lightBoxImages, isShow: false })
    }
  }, 'Escape')

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleSaveProfile = async () => {
    setLoading({ ...loading, saving: true })
    const updatedProfile = { ...profile }

    if (image) {
      const imageURLResponse = await uploadFileToCloudinary(image, 'image')
      if (imageURLResponse instanceof ErrorResponse) {
        toast.error(imageURLResponse.error)
      } else {
        updatedProfile.avatar = imageURLResponse.secure_url
      }
    }

    const response = await updateUser(updatedProfile)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
    } else {
      if (getItem('user')) {
        setItem('user', updatedProfile)
      }

      if (getFromSessionStorage('user')) {
        saveToSessionStorage('user', updatedProfile)
      }

      setProfile(updatedProfile)
      toast.success(response.message)
    }

    setLoading({ ...loading, saving: false })
  }

  const handleLightBox = useCallback((images: string[], currentImage: number) => {
    setLightBoxImages({ ...lightBoxImages, currentImage, images, isShow: true })
  }, [])

  if (loading.loading) return (
    <div className={'w-full h-full flex-center'}>
      <LoadingIcon width={60} height={60} />
    </div>
  )

  return <div className={'relative'}>
    {/* Loading layer */}
    {loading.saving && (
      <div className={'fixed inset-0 bg-[#000a] flex-center'}>
        <LoadingIcon width={60} height={60} />
      </div>)}

    {/* Lightbox images */}
    {lightBoxImages.isShow && (
      <LightBoxImages
        images={lightBoxImages.images}
        currentImage={lightBoxImages.currentImage}
        closeLightBox={() => setLightBoxImages({ ...lightBoxImages, isShow: false })}
      />
    )}

    <HeaderLayout>
      <div>
        <h2 className={`text-title-large font-bold`}>Your profile</h2>
        <p className={`text-body-medium pt-2`}>Enjoy moments</p>
      </div>
    </HeaderLayout>

    <section className={`pt-10 flex-between gap-10 flex-col-reverse md:gap-20 md:flex-row`}>
      <div className={'flex-1'}>
        <div>
          <div className={'py-4 md:max-w-[70%] border-b border-b-[#999]'}>
            <p className={'text-title-medium font-bold'}>Musics uploaded</p>
            <p className={'text-title-small text-gray pt-2'}>{musicProfile.uploaded.length}</p>
          </div>
          <div className={'py-4 md:max-w-[70%] border-b border-b-[#999]'}>
            <p className={'text-title-medium font-bold'}>Playlists</p>
            <p className={'text-title-small text-gray pt-2'}>{musicProfile.playlists.length}</p>
          </div>
          <div className={'py-4 md:max-w-[70%] '}>
            <p className={'text-title-medium font-bold'}>Albums</p>
            <p className={'text-title-small text-gray pt-2'}>4</p>
          </div>
        </div>

        <div className={'pt-8 flex flex-col gap-4'}>
          <h2 className={'text-title-medium font-bold'}>Personal Information:</h2>
          <Input
            value={profile.username}
            onValueChange={handleOnChange}
            name={'username'}
            shape={'rectangle'}
            placeholder={'Username:'}
            label={'Username:'}
            alignContent={'vertical'}
            className={'bg-[#fff0] w-full p-4'}
          />
          <Input
            value={profile.email}
            onValueChange={handleOnChange}
            disabled={true}
            name={'email'}
            shape={'rectangle'}
            placeholder={'Email:'}
            label={'Email:'}
            alignContent={'vertical'}
            className={'bg-[#fff0] w-full p-4'}
          />

          <Button
            className={'mt-8 self-start'}
            size={'lg'}
            onClick={handleSaveProfile}
          >Save</Button>
        </div>
      </div>

      <div className={'flex-1 self-center w-full max-w-[300px] md:max-w-[500px]'}>
        <label htmlFor="image" className={'cursor-pointer duration-300 hover:opacity-90'}>
          <Image
            src={objectUrl ? objectUrl : user.avatar}
            alt={'avatar'}
            shape={'circle'}
            className={`w-full h-full`}
            wrapperClass={''}
          />
        </label>
        <input type="file" id={'image'} hidden={true} onChange={onChange} />
        <label
          htmlFor="image"
          className={'block text-center mt-8 border border-[#999] py-3 rounded-lg cursor-pointer'}
        >Choose file here</label>
      </div>
    </section>

    <section>
      <h2 className={'text-title-medium font-bold pt-8'}>Your posts:</h2>
      <div className={'flex flex-col gap-4 pt-8'}>
        {Children.toArray(musicProfile. posts.map(post => (
          <Post
            post={post}
            onPreviewImage={handleLightBox}
          />
        )))}
      </div>
    </section>
  </div>
}
