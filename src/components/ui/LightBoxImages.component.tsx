import { Image } from "@/components/elements";
import { ChevronLeftFilledIcon, ChevronRightFilledIcon, CloseFilledIcon } from "@/assets/icons/filled";
import { memo, useState } from "react";

interface LightBoxImagesProps {
  images: string[]
  currentImage: number
  closeLightBox: () => void
}

type LightBoxImagesState = Pick<LightBoxImagesProps, 'images' | 'currentImage'>

type Direction = 'left' | 'right' | string

export const LightBoxImages = memo(({ images, currentImage, closeLightBox }: LightBoxImagesProps) => {
  const [lightBoxImages, setLightBoxImages] = useState<LightBoxImagesState>({ images, currentImage })

  const navigateImage = (direction: Direction) => {
    if (direction === 'left') {
      console.log('left')
      setLightBoxImages({ ...lightBoxImages, currentImage: lightBoxImages.currentImage - 1 })
    } else {
      setLightBoxImages({ ...lightBoxImages, currentImage: lightBoxImages.currentImage + 1 })
    }
  }

  return <div className={'fixed inset-0 bg-[#000d] z-[10]'}>
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
      onClick={closeLightBox}
    >
      <CloseFilledIcon />
    </span>
    <span
      className={'absolute top-1/2 left-4 icon cursor-pointer select-none'}
      onClick={() => navigateImage('left')}
    >
        <ChevronLeftFilledIcon
          width={50}
          height={50}
          className={lightBoxImages.currentImage === 0 ? 'hidden' : 'block'}
        />
      </span>
    <span
      className={'absolute top-1/2 right-4 icon cursor-pointer select-none'}
      onClick={() => navigateImage('right')}
    >
        <ChevronRightFilledIcon
          width={50}
          height={50}
          className={lightBoxImages.currentImage === lightBoxImages.images.length - 1 ? 'hidden' : 'block'}
        />
      </span>
  </div>
})
