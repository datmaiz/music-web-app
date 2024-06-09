import {cva} from "class-variance-authority";

const buttonVariants = cva('font-bold text-[white] duration-300 inline-flex items-center gap-2', {
  variants: {
    variant: {
      primary: 'gradient-primary',
      secondary: 'bg-white border border-solid border-[white] text-black',
      outlined: 'bg-[#ffffff00] border border-solid border-white text-white duration-300 hover:bg-[#fff5]'
    },
    size: {
      sm: 'py-1 px-2 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-6 text-md',
      full: 'w-full text-xl py-3 px-6'
    },
    shape: {
      rounded: 'rounded-full',
      rectangle: 'rounded-md',
      circle: 'aspect-square rounded-full'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    shape: 'rectangle'
  }
})

export default buttonVariants
