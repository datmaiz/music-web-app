import {SVGAttributes} from "react";

export interface IconProps extends SVGAttributes<SVGElement> {
  color?: string,
  size?: number,
  strokeWidth?: number
}
