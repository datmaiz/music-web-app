import {cva} from "class-variance-authority";

const inputVariants = cva('rounded-full bg-white border outline-none', {
  variants: {
    sizeof: {
      sm: 'py-1 px-2',
      md: 'py-2 px-4',
      lg: 'py-3 px-6',
      full: 'w-full py-2 px-4'
    },
    variant: {
      fill: '',
      outline: '',
    },
    shape: {
      rounded: 'rounded-full',
      rectangle: 'rounded-md'
    },
    hint: {
      center: 'placeholder:text-center',
      right: 'placeholder:text-right',
    }
  },
  defaultVariants: {
    sizeof: 'md',
    variant: 'outline',
    shape: 'rounded'
  }
})

export default inputVariants
