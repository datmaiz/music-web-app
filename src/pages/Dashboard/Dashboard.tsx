import React, {useState} from "react";
import {SidebarLayout} from "../../layouts";
import {PlusIcon} from "../../assets/icons";

export const Dashboard: React.FC = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(false)

  return <div className={'h-dvh bg-bg'}>
    <div className={`flex h-full`}>
      <div className={`flex-1 border-r border-[#999] relative`}>
        {/*<SidebarLayout/>*/}
        <PlusIcon />
      </div>

      <div className={`flex-[5]`}>

      </div>
    </div>
  </div>
}
