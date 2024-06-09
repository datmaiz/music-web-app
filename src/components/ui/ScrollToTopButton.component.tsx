import { ReactNode, RefObject, useEffect, useState } from "react";

interface ScrollToTopButtonProps {
  children?: ReactNode
  yOffsetToShowScroll: number
  containerScroll: RefObject<HTMLElement | null>
}

export const ScrollToTopButtonComponent = (
  {
    children,
    yOffsetToShowScroll,
    containerScroll
  }: ScrollToTopButtonProps) => {
  const [isShowButton, setIsShowButton] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (containerScroll?.current?.scrollTop! >= yOffsetToShowScroll) {
        setIsShowButton(true)
      } else {
        setIsShowButton(false)
      }
    }
    containerScroll.current?.addEventListener('scroll', handleScroll)

    return () => {
      containerScroll.current?.removeEventListener('scroll', handleScroll)
    }
  }, []);

  const scrollToTop = () => {
    containerScroll && containerScroll?.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div
      className={`fixed z-[9] bottom-32 right-8 duration-300 ${isShowButton ? 'opacity-100' : 'opacity-0 hidden'}`}
      onClick={scrollToTop}
    >
      <button
        type="button"
        className={'w-[4rem] h-[4rem] rounded-full border flex-center relative before:inset-0 ' +
          'before:bg-primary before:absolute before:rounded-full before:-z-[1] before:duration-300'}
      >{children}</button>
    </div>)
}
