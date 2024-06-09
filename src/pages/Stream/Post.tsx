import { IPost } from "@/interfaces";
import { Image } from "@/components/elements";
import { Children, memo, useState } from "react";
import { ErrorResponse, timeSince } from "@/utils";
import { CommentOutlinedIcon, HeartOutlinedIcon } from "@/assets/icons/outlined";
import { PlusIcon } from "@/assets/icons";
import { Link } from "react-router-dom";
import { updatePost } from "@/services";
import { useAuth } from "@/hooks";
import { toast } from "react-toastify";
import { HeartFilledIcon, VerticalThreeDotsFilledIcon } from "@/assets/icons/filled";

interface PostComponentProps {
  post: IPost
  onPreviewImage: (images: string[], index: number) => void
}

// const images = [
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4bFg9WfKmnc_dLUm_DnpTvBPPyOjxftZZBbS26B82w&s',
//   'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUySJWSjmFOJ5IUwCWDauBdigBhqIOiLoOtNtQAOKmeQ&s',
//   'https://media.istockphoto.com/id/1484902508/photo/drop-in-time-fairy-lake-tree-port-renfrew-vancouver-island-bc-canada.webp?b=1&s=170667a&w=0&k=20&c=k2Fh4omEL52NKpW7DTVtJT1xCLkLeHAC_FNQZfZ4NRc=',
//   'https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?cs=srgb&dl=pexels-pixabay-257360.jpg&fm=jpg'
// ]

export const Post = memo(({ post, onPreviewImage }: PostComponentProps) => {
  const [isShowFullTitle, setIsShowFullTitle] = useState<boolean>(false)
  const user = useAuth()!
  const [isLiked, setIsLiked] = useState<boolean>(post.likes.includes(user._id))
  const [isDropdownShowed, setIsDropdownShowed] = useState<boolean>(false)

  const handleLikePost = async () => {
    if (isLiked) {
      post.likes = post.likes.filter(ownerId => ownerId !== user._id)
    } else {
      post.likes.push(user._id)
    }

    setIsLiked(!isLiked)
    const response = await updatePost({ likes: post.likes }, post._id)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
      return
    }

    console.log(response.data)
  }

  return <article className={'max-w-[40rem] mx-auto bg-bg-300 p-4 md:p-6 rounded-lg shadow-lg'}>
    <div className={'flex-between items-center pb-4 relative'}>
      <div className={'flex gap-4'}>
        <Image
          src={post.owner.avatar}
          alt={post.owner.username}
          shape={'circle'}
          wrapperClass={'w-[3rem]'}
        />

        <div>
          <p className={'font-medium text-body-medium truncate'}>{post.owner.username}</p>
          <p className={'text-gray text-body-small truncate'}>{timeSince(new Date(post.createdAt))} ago</p>
        </div>
      </div>

      <span
        className={'icon cursor-pointer'}
        onClick={() => setIsDropdownShowed(!isDropdownShowed)}
      >
        <VerticalThreeDotsFilledIcon />
      </span>

    {/* Dropdown */}
      {<div className={`absolute right-0 top-full w-32 h-32 bg-bg z-[1] rounded-lg duration-300 ${isDropdownShowed ? '' : 'scale-0'}`}>
        <p
          className={'px-4 py-2 duration-300 hover:opacity-80 cursor-pointer'}
        ><span className={'truncate'}>Edit post</span></p>
      </div>}
    </div>

    <p className={`pb-4 text-body-medium`}>
      <span
        className={`${isShowFullTitle ? '' : 'line-clamp-2'}`}
      >{post.title}
      </span>

      <span
        className={'block text-body-small text-gray cursor-pointer text-right'}
        onClick={() => setIsShowFullTitle(!isShowFullTitle)}
      >{isShowFullTitle ? 'Make short' : 'More'}</span>
    </p>

    <div className={`grid grid-cols-2 gap-2 ${post.images.length > 4 ? '[&>*:nth-child(4)]:backdrop-contrast-200' : ''}`}>
      {Children.toArray(post.images.slice(0, 4).map((image, index) => (
        <div
          className={`rounded-xl relative overflow-hidden before:absolute before:inset-0 cursor-pointer hover:opacity-80 duration-300 
        ${post.images.length > 4 && index === 3 ? 'before:bg-[#000b]' : ''}`}
          onClick={() => onPreviewImage(post.images, index)}
        >
          <Image
            src={image}
            shape={'rounded'}
            wrapperClass={' w-full h-full cursor-pointer duration-300 hover:opacity-80'}
            className={'rounded-xl w-full aspect-video object-cover'}
          />
          {post.images.length > 4 && index === 3 && (
            <span className={'absolute z-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center'}>
              <PlusIcon />
              <span className={'text-title-medium'}>{post.images.length - 4}</span>
            </span>)}
        </div>
      )))}
    </div>

    <div className={'text-right pt-4 gap-2'}>
      {Children.toArray(post.tags.map(tag => (
        <Link to={`#${tag}`}>#{tag}</Link>
      )))}
    </div>

    <div className={'pt-4 flex gap-4'}>
      <span
        className={'cursor-pointer flex items-center gap-4'}
        onClick={handleLikePost}
      >
        {isLiked ? <HeartFilledIcon className={'text-primary'} /> : <HeartOutlinedIcon />}
        <span className={'text-body-large'}>{post.likes.length}</span>
      </span>
      <span className={'cursor-pointer flex items-center gap-4'}>
        <CommentOutlinedIcon width={40} height={40} />
        <span className={'text-body-large'}>{post.shares.length}</span>
      </span>
    </div>
  </article>
})
