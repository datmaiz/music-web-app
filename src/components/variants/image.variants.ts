import {cva} from "class-variance-authority";

const imageVariants = cva('', {
  variants: {
    shape: {
      circle: 'rounded-full aspect-square',
      rounded: 'rounded-md'
    },
  },
  defaultVariants: {

  }
})

export default imageVariants
