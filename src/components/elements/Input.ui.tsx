import React, {InputHTMLAttributes, ReactNode, useId} from "react";
import cn from "../../utils/cn.util.ts";
import {inputVariants} from "../variants";
import {VariantProps} from "class-variance-authority";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  label?: string,
  startIcon?: ReactNode
  endIcon?: ReactNode
  alignContent?: 'vertical' | 'horizontal',
  labelColor?: string,
  value: string,
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = React.memo((
  {
    className = '',
    sizeof,
    shape,
    hint,
    variant,
    label,
    startIcon,
    endIcon,
    alignContent = 'horizontal',
    labelColor,
    value,
    onValueChange,
    ...props
  }
) => {
  const id = useId()

  if (startIcon) {
    className = className.concat(' pl-10')
  }

  if (endIcon) {
    className = className.concat(' pr-10')
  }

  return <div
    className={`flex relative gap-2 w-full ${alignContent && alignContent === 'horizontal' ? 'items-center' : 'flex-col'}`}>
    {label && <label htmlFor={id} className={labelColor ? labelColor : ''}>{label}</label>}
    {startIcon && <span className='absolute left-1 top-1/2 -translate-y-1/2 cursor-pointer'>{startIcon}</span>}
    <input
      id={id}
      type="text"
      className={cn(inputVariants({sizeof, shape, hint, variant, className}))} {...props}
      value={value}
      onChange={onValueChange}
    />
    {endIcon && <span className={'absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'}>{endIcon}</span>}
  </div>
})

export default Input
