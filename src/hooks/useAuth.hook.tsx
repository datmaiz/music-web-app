import { useSessionStorage } from "@/hooks/useSessionStorage.hook.tsx";
import { useLocalStorage } from "@/hooks/useLocalStorage.hook.tsx";
import { IUser } from "@/interfaces";

export const useAuth = () => {
  const { getFromSessionStorage } = useSessionStorage()
  const { getItem } = useLocalStorage()

  const userFromSession = getFromSessionStorage('user')
  const userFromLocalStorage = getItem('user')

  if (!userFromLocalStorage && !userFromSession) return null

  return userFromSession as IUser || userFromLocalStorage as IUser
}
