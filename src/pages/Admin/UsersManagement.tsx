import React, { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { HeaderLayout } from "@/layouts";
import { IUser } from "@/interfaces";
import { deleteUser, getUsers, updateUser } from "@/services";
import { ErrorResponse } from "@/utils";
import { LoadingIcon } from "@/assets/icons/filled";
import { Image } from "@/components/elements";
import { useAuth } from "@/hooks";

type FilterOption = 'all' | 'admin' | 'client' | string

interface ILoading {
  fetching: boolean
  deleting: boolean
  changingRole: boolean
}

const UsersManagement = React.memo(() => {
  const [users, setUsers] = useState<IUser[]>([])
  const [filterOption, setFilterOption] = useState<FilterOption>('all')
  const [loading, setLoading] = useState<ILoading>({ fetching: true, deleting: false, changingRole: false })
  const user = useAuth()!

  const filteredUsers = useMemo(() => users.filter(user => {
    return filterOption === 'admin' ? user.isAdmin : filterOption === 'client' ? !user.isAdmin : user
  }), [users, filterOption])

  useEffect(() => {
    (async () => {
      setLoading({ ...loading, fetching: false })
      const response = await getUsers()

      if (response instanceof ErrorResponse) {
        toast.error(response.error)
        return
      }

      response.data && setUsers(response.data)
    })()
  }, [])

  const onOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setFilterOption(value)
  }

  const onDeleteClick = useCallback(async (id: string) => {
    // (async () => {
      const response = await deleteUser(id)

      if (response instanceof ErrorResponse) {
        toast.error(response.error)
      } else {
        toast.success(response.message)
        setUsers(users => users.filter(user => user._id != id))
      }
    // })()
  }, [])

  const onChangeRole = async (user: IUser) => {
    const response = await updateUser({...user, isAdmin: !user.isAdmin})
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
    } else {
      const newUsers = users.map(each => each._id === user._id ? {...each, isAdmin: !each.isAdmin} : each)
      setUsers(newUsers)
    }
  }

  return <div>
    <HeaderLayout>
      <div>
        <h2 className={`text-title-large font-bold`}>Hello admin</h2>
        <p className={`text-body-medium pt-2`}>{user.username}</p>
      </div>
    </HeaderLayout>

    <section className={'flex-between'}>
      <select
        value={filterOption}
        className={'py-2 px-6 bg-[#fff0] border border-[#999] rounded-lg cursor-pointer self-center'}
        onChange={onOptionChange}
      >
        <option className={'bg-[#000] rounded-lg'} value="all">All</option>
        <option className={'bg-[#000] rounded-lg'} value="admin">Admin</option>
        <option className={'bg-[#000] rounded-lg'} value="client">Client</option>
      </select>
      <select
        value={''}
        className={'self-center'}
        onChange={() => {
        }}
      >
        <option value=""></option>
      </select>
    </section>

    <section className={'pt-8'}>
      {loading.fetching ?
        <div className={'w-full h-full flex-center'}><LoadingIcon /></div> :
        filteredUsers.map(user => (
          <UserRow
            key={user._id}
            user={user}
            onDelete={onDeleteClick}
            onChangeRole={onChangeRole}
          />
        ))
      }
    </section>
  </div>
})

interface UserRowProps {
  user: IUser
  onDelete: (id: string) => void
  onChangeRole: (user: IUser) => void
}

const UserRow: React.FC<UserRowProps> = memo(({ user, onDelete, onChangeRole }) => {
    const [loading, setLoading] = useState<ILoading>({ fetching: false, changingRole: false, deleting: false })

    const onDeleteClick = (id: string) => {
      setLoading({ ...loading, deleting: true })
      onDelete(id)
      setLoading({ ...loading, deleting: false })
    }

    const onChangeRoleClick = () => {
      setLoading({ ...loading, changingRole: true })
      onChangeRole(user)
      setLoading({ ...loading, changingRole: false })
    }

    return <div className={'flex justify-between cursor-pointer p-4 rounded-lg duration-300 hover:bg-bg-300'}>
      <div className={'flex gap-4'}>
        <Image
          src={user.avatar}
          shape={'circle'}
          wrapperClass={'w-[50px]'}
        />
        <div className={'flex-between flex-col'}>
          <p className={'font-medium text-body-medium'}>{user.username ? user.username : 'username'}</p>
          <p className={'text-body-small'}>{user.email}</p>
        </div>
      </div>

      <div className={'flex gap-4'}>
        <button
          type={'button'}
          className={`py-2 self-center px-6 font-bold rounded-lg duration-300 ${loading.deleting ? 'bg-gray cursor-not-allowed' : 'bg-red hover:opacity-70'}`}
          disabled={loading.deleting || loading.changingRole || loading.fetching}
          onClick={() => onDeleteClick(user._id)}
        >{loading.deleting ? <LoadingIcon color={'white'} width={25} height={25} /> : 'Delete'}</button>

        <button
          onClick={onChangeRoleClick}
          type={'button'}
          className={`py-2 self-center px-6 font-bold rounded-lg duration-300 
        ${user.isAdmin ? 'bg-blue-600' : 'bg-yellow'} ${loading.changingRole ? '' : 'hover:opacity-70'}`}
          disabled={loading.deleting || loading.changingRole || loading.fetching}
        >{loading.changingRole ? <LoadingIcon width={25} height={25} /> : user.isAdmin ? 'Admin' : 'Client'}</button>

        {/*<button*/}
        {/*  type={'button'}*/}
        {/*  className={'py-2 bg-green self-center px-6 font-bold rounded-lg duration-300 hover:opacity-70'}*/}
        {/*  disabled={loading.deleting || loading.changingRole || loading.fetching}*/}
        {/*  onClick={() => navigate(`/admin/user/${user._id}`)}*/}
        {/*>Details*/}
        {/*</button>*/}
      </div>
    </div>
  }
)
export default UsersManagement
