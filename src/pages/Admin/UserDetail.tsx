import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IParam } from "@/interfaces/IParam.ts";
import { getUserById } from "@/services";
import { ErrorResponse } from "@/utils";
import { toast } from "react-toastify";
import { IUser } from "@/interfaces";
import { HeaderLayout } from "@/layouts";

const UserDetailPage = React.memo(() => {
  const [user, setUser] = useState<IUser>()
  const { userId } = useParams<Partial<IParam>>()

  useEffect(() => {
    (async () => {
      if (!userId) return
      const response = await getUserById(userId)

      if (response instanceof ErrorResponse) {
        toast.error(response.error)
        return
      }

      console.log(response.data)
      setUser(response.data)
    })()
  }, [])

  return <div>
    <HeaderLayout>

    </HeaderLayout>
    {user?.email}
  </div>
})

export default UserDetailPage
