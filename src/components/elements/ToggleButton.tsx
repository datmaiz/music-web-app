import React, {InputHTMLAttributes, useId, useState} from "react";
import {twMerge} from "tailwind-merge";
import {VariantProps} from "class-variance-authority";
import toggleVariants from "../variants/toggle.variants.ts";

export interface ToggleButtonProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof toggleVariants> {
  leftLabel?: string
  rightLabel?: string
  isOn: boolean
  circleClass?: string
}

const ToggleButton: React.FC<ToggleButtonProps> = (
  {
    leftLabel,
    rightLabel,
    isOn = false,
    circleClass,
    ...props
  }
) => {
  const [checked, setChecked] = useState<boolean>(isOn)
  const id: string = useId()

  return <label htmlFor={id} className={'select-none block border border-solid border-black w-28 h-8 rounded-full'} >
    <span className={twMerge('block bg-primary h-full rounded-full aspect-square checked:bg-blue', circleClass)}></span>
    <input type="checkbox" onChange={() => setChecked(!checked)} id={id} hidden checked={checked} {...props} />
  </label>
}

export default ToggleButton
