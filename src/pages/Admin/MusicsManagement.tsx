import React, { ChangeEvent, useState } from "react";
import { HeaderLayout } from "@/layouts";

type GenreOption = 'harmony' | string

const MusicsManagement = React.memo(() => {
  const [genresOption, setGenresOption] = useState<GenreOption>('harmony')

  const onOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setGenresOption(value)
  }

  return <div>
    <HeaderLayout>
      <div>
        <h2 className={`text-title-large font-bold`}>Hello admin</h2>
        <p className={`text-body-medium pt-2`}>Ngo Thanh Dat</p>
      </div>
    </HeaderLayout>

    <section className={'flex-between'}>
      <select
        value={genresOption}
        className={'py-2 px-6 bg-[#fff0] border border-[#999] rounded-lg cursor-pointer self-center'}
        onChange={onOptionChange}
      >
        <option className={'bg-[#000] rounded-lg'} value="all">All</option>
        <option className={'bg-[#000] rounded-lg'} value="admin">Harmony</option>
        <option className={'bg-[#000] rounded-lg'} value="client">Pop</option>
      </select>
      <select
        value={''}
        className={'self-center'}
      >
        <option value=""></option>
      </select>
    </section>
  </div>
})

export default MusicsManagement
