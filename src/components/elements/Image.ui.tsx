import React, { ImgHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";
import imageVariants from "../variants/image.variants.ts";
import cn from "../../utils/cn.util.ts";
import { twMerge } from "tailwind-merge";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof imageVariants> {
  caption?: string,
  captionAlign?: 'vertical' | 'horizontal'
  size?: 'full'
  wrapperClass?: string
}

const Image: React.FC<ImageProps> = (
  {
    className = '',
    caption,
    captionAlign,
    shape,
    size,
    wrapperClass = '',
    alt,
    ...props
  }
) => {
  // const [loading, setLoading] = useState(true)

  if (size === 'full') className = className.concat(' w-full h-full')

  // const onLoadImage = () => {
  //   setLoading(false)
  // }

  return <figure
    className={twMerge(`flex gap-1 items-center md:gap-2 lg:gap-3 xl:gap-4}
    ${captionAlign && captionAlign === 'vertical' ? 'flex-col' : ''}`, wrapperClass)}
  >
    {/*<span*/}
    {/*  style={{ display: loading ? 'block' : 'none'}}*/}
    {/*>*/}
    {/*  <LoadingIcon />*/}
    {/*</span>*/}
    <img
      className={cn(imageVariants({shape, className}))} {...props}
      loading='lazy'
      // style={{ display: loading ? 'none' : 'block'}}
      // onLoad={onLoadImage}
      alt={alt}
    />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}

export default Image
