import {FunctionComponent, SVGProps} from "react";

export interface IMenuItem {
  title: string,
  icon: FunctionComponent<SVGProps<SVGSVGElement>>,
  path: string
}
