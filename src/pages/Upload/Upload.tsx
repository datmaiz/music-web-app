import { ChangeEvent, useEffect, useState } from "react";

import { HeaderLayout } from "@/layouts";
import { Button, Input } from "@/components/elements";
import { CheckCircleOutlinedIcon, ImageOutlinedIcon, ReactangleAddOutlinedIcon } from "@/assets/icons/outlined";
import { createSong, uploadFileToCloudinary } from "@/services/apis";
import { LoadingIcon } from "@/assets/icons/filled";
import { useAuth } from "@/hooks";
import { ISong } from "@/interfaces";
import { ErrorResponse } from "@/utils";
import { toast } from "react-toastify";

interface FormState {
  name: string
  lyrics: string
  genre: string
  genres: string[]
  presentation: string
  presentations: string[]
  image: File | null
  song: File | null
}

interface LoadingProps {
  uploading: boolean
}

const initialFormState: FormState = {
  name: '',
  lyrics: '',
  genre: '',
  genres: [],
  presentation: '',
  presentations: [],
  image: null,
  song: null,
}

const initialLoadingState: LoadingProps = {
  uploading: false
}

export const Upload = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [loading, setLoading] = useState<LoadingProps>(initialLoadingState)
  const [objectURL, setObjectURL] = useState<string>('')

  const user = useAuth()!

  useEffect(() => {

    return () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL)
      }
    }
  }, [objectURL])

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleAddGenre = () => {
    setFormState(prevState => ({ ...prevState, genres: [...prevState.genres, prevState.genre], genre: '' }))
  }

  const handleAddPresentation = () => {
    setFormState(prevState => ({...prevState, presentations: [...prevState.presentations, prevState.presentation], presentation: ''}))
  }

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormState(prevState => ({ ...prevState, image: file }))
      setObjectURL(URL.createObjectURL(file))
    }
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormState(prevState => ({ ...prevState, song: file }))
    }
  }

  const resetFields = () => {
    setFormState(initialFormState)
    setObjectURL('')
  }

  const handleUpload = async () => {
    if (!formState.image || !formState.song) return
    setLoading(prevState => ({ ...prevState, uploading: true }))

    const [imageResponse, songResponse] = await Promise.allSettled([
      uploadFileToCloudinary(formState.image, 'image'),
      uploadFileToCloudinary(formState.song, 'auto')
    ])

    const newSong: Partial<ISong> = {
      name: formState.name,
      lyrics: formState.lyrics,
      genres: formState.genres,
      listens: 0,
      ownerId: user._id,
      presentations: formState.presentations,
    }

    if (imageResponse.status === 'fulfilled') {
      const response = imageResponse.value
      if (response instanceof ErrorResponse) {
        toast.error(response.error)
      } else {
        newSong.thumb = response?.secure_url
      }
    } else {
      toast.error(imageResponse.reason)
    }

    if (songResponse.status === 'fulfilled') {
      const response = songResponse.value
      if (response instanceof ErrorResponse) {
        toast.error(response.error)
      } else {
        newSong.songUrl = response?.secure_url
      }
    } else {
      toast.error(songResponse.reason)
    }

    const response = await createSong(newSong)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
    } else {
      console.log(response.data)
    }

    setLoading(prevState => ({ ...prevState, uploading: false }))
    resetFields()
  }

  return <div>
    <HeaderLayout>
      <div>
        <h1 className={'text-title-large font-bold tracking-wider'}>Uploading</h1>
        <p className={'text-body-medium pt-2'}>Upload your musics</p>
      </div>
    </HeaderLayout>
    <section className={'flex-between gap-8'}>
      <div className={'flex-[2]'}>
        <Input
          value={formState.name}
          onValueChange={onChange}
          className={'bg-[#fff0] p-4 text-body-medium'}
          name={'name'}
          label={'Name'}
          alignContent={'vertical'}
          shape={'rectangle'}
          autoFocus={true}
        />

        <div className={'pt-4'}>
          <div className={'flex items-center gap-2'}>
            <Input
              value={formState.genre}
              onValueChange={onChange}
              name={'genre'}
              shape={'rectangle'}
              className={'bg-[#fff0] p-4 text-body-medium'}
              label={'Genres'}
              alignContent={'vertical'}
            />

            <span
              onClick={handleAddGenre}
              className={'self-end cursor-pointer'}
            >
              <ReactangleAddOutlinedIcon
                width={60}
                height={60}
                className={'hover:text-secondary duration-300'}
              />
            </span>
          </div>
          <div className={'flex gap-4 pt-4 w-full overflow-y-auto scroll-hidden'}>
            {formState.genres.map(genre => (
              <div key={genre} className={'px-4 py-2 rounded-lg border shrink-0'}>{genre}</div>
            ))}
          </div>
        </div>

        <div className={'pt-4'}>
          <div className={'flex items-center gap-2'}>
            <Input
              value={formState.presentation}
              onValueChange={onChange}
              name={'presentation'}
              shape={'rectangle'}
              className={'bg-[#fff0] p-4 text-body-medium'}
              label={'Presentations'}
              alignContent={'vertical'}
            />

            <span
              onClick={handleAddPresentation}
              className={'self-end cursor-pointer'}
            >
              <ReactangleAddOutlinedIcon
                width={60}
                height={60}
                className={'hover:text-secondary duration-300'}
              />
            </span>
          </div>
          <div className={'flex gap-4 pt-4 w-full overflow-y-auto scroll-hidden'}>
            {formState.presentations.map(genre => (
              <div key={genre} className={'px-4 py-2 rounded-lg border shrink-0'}>{genre}</div>
            ))}
          </div>
        </div>

        <div className={'flex flex-col pt-4 gap-2'}>
          <label htmlFor="lyrics">Lyrics</label>
          <textarea
            name="lyrics"
            id="lyircs"
            value={formState.lyrics}
            onChange={onChange}
            className={'bg-[#fff0] border border-[#fff] rounded-md h-72 outline-none p-4 text-body-medium resize-none'}
          ></textarea>
        </div>

        <Button
          size={'lg'}
          className={'mt-4'}
          onClick={handleUpload}
          disabled={loading.uploading}
        >{loading.uploading ? <LoadingIcon /> : 'Upload'}</Button>
      </div>

      <div className={'flex-1 shrink-0'}>
        <p className={'pb-4'}>Upload song's image</p>
        <label
          htmlFor="image-upload"
          className={'cursor-pointer'}>
          {objectURL ? <img src={objectURL} alt="thumb" className={'w-full object-cover rounded-xl'} />
            : <div className={'w-full aspect-square flex-center border rounded-xl flex-col'}>
              <ImageOutlinedIcon width={120} height={120} />
              <p>Upload your file</p>
            </div>
          }
        </label>
        <input type="file" hidden={true} id={'image-upload'} onChange={onImageChange} />

        <p className={'py-4'}>Upload song's file</p>
        <label htmlFor="song-upload" className={'px-4 py-2 duration-300 border border-[#fff0] hover:border-white rounded-lg cursor-pointer inline-block'}>Upload file
          here</label>
        <input type="file" id={'song-upload'} hidden={true} onChange={onFileChange} />
        {formState.song && <><p className={'pt-4'}>{formState.song.name}</p>
            <div className={'flex gap-2 items-center pt-4'}>
                <div className={'relative flex-1 h-2 bg-bg-300 duration-1000 inset-0 overflow-hidden rounded-lg'}>
                    <div
                        className={`absolute duration-300 bg-primary inset-0 ${formState.song ? '' : 'scale-x-0'} origin-left`}></div>
                </div>
                <CheckCircleOutlinedIcon color={'green'} width={20} height={20} />
            </div>
        </>
        }
      </div>
    </section>
  </div>
}
