import { ChangeEvent, Children, memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { HeaderLayout } from "@/layouts";
import { IPost } from "@/interfaces";
import { Button, Image, Input } from "@/components/elements";
import { useAuth, useKeymap } from "@/hooks";
import { ImageOutlinedIcon } from "@/assets/icons/outlined";
import { ChevronLeftFilledIcon, ChevronRightFilledIcon, CloseFilledIcon, LoadingIcon } from "@/assets/icons/filled";
import { uploadFileToCloudinary, createPost, getPosts } from "@/services";
import { ErrorResponse } from "@/utils";
import { PlusIcon } from "@/assets/icons";
import { Post } from "./Post";

interface ImagesPostProps {
  images: File[]
  imageURLs: string[]
}

interface LoadingProps {
  loadingPost: boolean
  uploadingPost: boolean
}

interface LightBoxImageProps {
  images: string[]
  isShow: boolean
  currentImage: number
}

const initialPostState: Pick<IPost, 'title' | 'images' | 'tags'> = {
  title: '',
  images: [],
  tags: []
}

const initImagesPostState: ImagesPostProps = {
  images: [],
  imageURLs: [],
}

const initLoadingState: LoadingProps = {
  loadingPost: true,
  uploadingPost: false
}

const initialLightBoxImageState: LightBoxImageProps = {
  images: [],
  isShow: false,
  currentImage: 0
}

export const Stream = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [images, setImages] = useState<ImagesPostProps>(initImagesPostState)
  const [post, setPost] = useState(initialPostState)
  const [tag, setTag] = useState('')
  const [lightBoxImages, setLightBoxImages] = useState<LightBoxImageProps>(initialLightBoxImageState)
  const [loading, setLoading] = useState<LoadingProps>(initLoadingState)

  const user = useAuth()!

  useEffect(() => {
    (async () => {
      const response = await getPosts()
      if (response instanceof ErrorResponse) {
        toast.error(response.error)
        return
      }

      const posts = response.data
      if (posts) {
        console.log(posts)
        setPosts(posts)
      }
      setLoading({ ...loading, loadingPost: false })
    })()
  }, []);

  const onPostTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setPost({ ...post, title: value })
  }

  const onPickImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !files.length) return

    const URLs: string[] = []
    const Files: File[] = []
    for (const file of files) {
      URLs.push(URL.createObjectURL(file))
      Files.push(file)
    }

    setImages(prevState => ({
      images: [...prevState.images, ...Files],
      imageURLs: [...prevState.imageURLs, ...URLs]
    }))

    e.target.files = null
  }

  const deleteImageFromPreview = useCallback((url: string) => {
    console.log(url)
    console.log(url === images.imageURLs[0])
    const index = images.imageURLs.findIndex(image => {
      console.log('image: ', image)
      return image === url
    })
    console.log(index)
    if (index < 0) return

    const URLs = images.imageURLs.filter((_, idx) => index !== idx)
    const imageFiles = images.images.filter((_, idx) => index !== idx)


    URL.revokeObjectURL(images.imageURLs[index])

    setImages({ images: imageFiles, imageURLs: URLs })
  }, [])

  const addTag = () => {
    if (!tag || loading.uploadingPost) return

    setPost(prevState => ({ ...prevState, tags: [...prevState.tags, tag] }))
    setTag('')
  }

  const handlePost = async () => {
    if (loading.uploadingPost) return

    setLoading(prevState => ({ ...prevState, uploadingPost: true }))
    const promises = await Promise.allSettled(images.images.map(image => {
      return uploadFileToCloudinary(image, 'image')
    }))
    const imageURLs: string[] = []
    promises.forEach(promise => {
      if (promise.status === 'fulfilled') {
        const response = promise.value
        if (response instanceof ErrorResponse) {
          toast.error(response.error)
        } else {
          imageURLs.push(response.secure_url)
        }
      }
    })
    const newPost: Partial<IPost> = {
      title: post.title,
      images: imageURLs,
      ownerId: user._id,
      tags: post.tags
    }

    const response = await createPost(newPost)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
    } else {
      toast.success(response.message)
    }

    setLoading(prevState => ({ ...prevState, uploadingPost: false }))
  }

  useKeymap(() => {
    if (lightBoxImages.isShow) {
      setLightBoxImages({ ...lightBoxImages, isShow: false })
    }
  }, 'Escape')

  const handleLightBox = useCallback((images: string[], choosenImageIndex: number) => {
    setLightBoxImages({ ...lightBoxImages, currentImage: choosenImageIndex, isShow: true, images })
  }, [])

  return <div>
    <HeaderLayout>
      <div>
        <h1 className={'text-title-large font-bold'}>Stream Page</h1>
        <p className={'pt-2 text-body-medium'}>Connect to others people</p>
      </div>
    </HeaderLayout>

    {/* Preview Image of post */}
    {lightBoxImages.isShow && (<div className={'fixed inset-0 bg-[#000d] z-[10]'}>
      <div className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[70dvh] flex'}>
        <Image
          src={lightBoxImages.images[lightBoxImages.currentImage]}
          alt={'Light box'}
          wrapperClass={'w-full h-full shrink-0'}
          className={'w-full h-full object-contain'}
        />
      </div>

      <span
        className={'absolute top-4 right-4 icon cursor-pointer'}
        onClick={() => setLightBoxImages({ ...lightBoxImages, isShow: false })}
      >
        <CloseFilledIcon />
      </span>
      <span
        className={'absolute top-1/2 left-4 icon cursor-pointer select-none'}
        onClick={() => setLightBoxImages({ ...lightBoxImages, currentImage: lightBoxImages.currentImage - 1 })}
      >
        <ChevronLeftFilledIcon
          width={50}
          height={50}
          className={lightBoxImages.currentImage === 0 ? 'hidden' : 'block'}
        />
      </span>
      <span
        className={'absolute top-1/2 right-4 icon cursor-pointer select-none'}
        onClick={() => setLightBoxImages({ ...lightBoxImages, currentImage: lightBoxImages.currentImage + 1 })}
      >
        <ChevronRightFilledIcon
          width={50}
          height={50}
          className={lightBoxImages.currentImage === lightBoxImages.images.length - 1 ? 'hidden' : 'block'}
        />
      </span>
    </div>)}

    <section>
      <p className={'text-body-medium'}>What's on your mind?</p>

      <div className={'flex mt-4 gap-4'}>
        <textarea
          name="title"
          value={post.title}
          onChange={onPostTitleChange}
          className={'w-full h-[7rem] bg-[#fff0] border rounded-lg resize-none p-4 text-body-medium outline-none'}
          placeholder={"What's on your mind?"}
          disabled={loading.uploadingPost}
        ></textarea>

        <label htmlFor={'image-file'}
               className={`self-center ${loading.uploadingPost ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          <input type="file" id="image-file" hidden={true} accept="image/*" multiple={true}
                 onChange={onPickImagesChange} />
          <ImageOutlinedIcon width={40} height={40}
                             className={`${loading.uploadingPost ? '' : 'duration-300 hover:text-secondary'}`} />
        </label>
      </div>

      <div className={'py-4'}>
        <label
          htmlFor="tags"
          className={'pb-4 block'}
        >Hash tags:</label>
        <div className={'flex items-center gap-4'}>
          <Input
            value={tag}
            onValueChange={e => setTag(e.target.value)}
            className={'bg-[#fff0] flex-1 p-4'}
            placeholder={'Tag: '}
            shape={'rectangle'}
            disabled={loading.uploadingPost}
          />
          <span
            className={`${loading.uploadingPost ? 'cursor-not-allowed' : 'icon cursor-pointer'}`}
            onClick={addTag}
          >
            <PlusIcon />
          </span>
        </div>
        <div className={'flex gap-4 pt-4 overflow-x-auto scroll-hidden'}>
          {Children.toArray(post.tags.map(tag => <span>#{tag}</span>))}
        </div>
      </div>

      <PreviewImages URLs={images.imageURLs} handleDeleteImage={deleteImageFromPreview} />

      <Button
        shape={'rectangle'}
        variant={'outlined'}
        className={'w-[200px] flex-center'}
        onClick={handlePost}
        disabled={loading.uploadingPost}
      >{loading.uploadingPost ? <LoadingIcon className={'block mx-auto'} /> : 'Post now'}</Button>
    </section>

    <section className={'pt-8'}>
      <h2 className={'text-title-small font-medium pb-16'}>New feeds:</h2>
      {loading.loadingPost ? (
        <div className={'flex-center'}>
          <LoadingIcon width={50} height={50} />
        </div>
      ) : (
        posts.length ? <Posts posts={posts} handleLightBox={handleLightBox} /> :
          <p className={'text-center pt-4'}>Have no post</p>
      )}

    </section>
  </div>
}

interface PostProps {
  posts: IPost[]
  handleLightBox: (images: string[], index: number) => void
}

const Posts = memo(({ posts, handleLightBox }: PostProps) => {
  return <div className={'flex flex-col gap-6'}>
    {Children.toArray(posts.map(post => (
      <Post
        post={post}
        onPreviewImage={handleLightBox}
      />
    )))}
  </div>
})

interface PreviewImagesProps {
  URLs: string[]
  handleDeleteImage: (url: string) => void
}

const PreviewImages = memo(({ handleDeleteImage, URLs }: PreviewImagesProps) => {

  return <div className={'flex gap-4 pt-4'}>
    {Children.toArray(URLs.map((image) => (
      <div className={'relative duration-300 hover:opacity-80'}>
        <Image
          src={image}
          alt={'preview'}
          shape={'rounded'}
          className={'w-full h-full object-cover'}
          wrapperClass={'w-[100px] aspect-square'}
        />
        <span
          className={'absolute top-1 right-1'}
          onClick={() => handleDeleteImage(image)}
        >
          <CloseFilledIcon
            width={20}
            height={20}
            className={'duration-300 text-gray hover:text-secondary cursor-pointer'}
          />
        </span>
      </div>
    )))}
  </div>
})
