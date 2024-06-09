import React, {ButtonHTMLAttributes, ReactNode} from "react";
import cn from "../../utils/cn.util.ts";
import {buttonVariants} from "../variants";
import {VariantProps} from "class-variance-authority";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const Button: React.FC<IButtonProps> = React.memo((
  {
    children,
    className,
    variant,
    shape,
    size,
    startIcon,
    endIcon,
    ...props
  }) => {
  return <button
    className={cn(buttonVariants({variant, shape, size}), className)}
    {...props}>
    {startIcon && <span>{startIcon}</span>}
    {children && <span className={'text-center w-full'}>{children}</span>}
    {endIcon && <span>{endIcon}</span>}
  </button>
})

export default Button
