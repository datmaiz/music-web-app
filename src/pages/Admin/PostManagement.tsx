import React, { Children, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { HeaderLayout } from "@/layouts";
import { useAuth } from "@/hooks";
import { getPosts } from "@/services";
import { ErrorResponse } from "@/utils";
import { IPost } from "@/interfaces";
import { Post } from "@/pages/Stream";
import { LoadingIcon } from "@/assets/icons/filled";

interface LoadingProps {
  fetching: boolean,
  deleting: boolean,
}

const initialLoadingProps: LoadingProps = {
  deleting: false,
  fetching: true
}

const PostManagementPage: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState<LoadingProps>(initialLoadingProps)

  const user = useAuth()!

  useEffect(() => {
    (async () => {
      const response = await getPosts()
      if (response instanceof ErrorResponse) {
        toast.error(response.error)
      } else {
        const posts = response.data
        if (posts) {
          setPosts(posts)
        }
      }

      setLoading({ ...loading, fetching: false })
    })()
  }, []);

  const onDeleteSuccess = useCallback((postId: string) => {
    const updatedPosts = posts.filter(post => post._id !== postId)
    setPosts(updatedPosts)
  }, [])

  return <div>
    <HeaderLayout>
      <div>
        <h2 className={`text-title-large font-bold`}>Hello admin</h2>
        <p className={`text-body-medium pt-2`}>{user.username}</p>
      </div>
    </HeaderLayout>

    <section className={'pt-8'}>
      <h4 className={'text-2xl font-bold'}>Collections: </h4>

      {loading.fetching ? (
        <div className={'flex-center'}>
          <LoadingIcon width={50} height={50} />
        </div>
      ) : (<div className={'pt-8'}>
        {Children.toArray(posts.map((post, index) => (
          <div className={index != posts.length - 1 ? 'pb-8' : ''}>
            <Post onDeleteSuccess={onDeleteSuccess} post={post} onPreviewImage={() => {
            }} />
          </div>
        )))}
      </div>)}
    </section>
  </div>
}

export default PostManagementPage