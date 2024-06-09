import React, { Children } from "react";
import { list } from "postcss";

interface ILoop {
  list: any[],
  render: (items: any[], callback: () => void) => void,
}

export const LoopItems: React.FC<ILoop> = ({ list: string, render }) => {
  return Children.toArray(list)
}
