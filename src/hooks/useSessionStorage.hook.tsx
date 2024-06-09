import { isEmpty } from "@/utils";

export const useSessionStorage = () => {
  const saveToSessionStorage = (key: string, value: any) => {
    if (isEmpty(key)) return
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  const clearSessionStorage = () => {
    sessionStorage.clear()
  }

  const getFromSessionStorage = (key: string) => {
    const user = sessionStorage.getItem(key)
    return user ? JSON.parse(user) : null
  }

  const removeItem = (key: string) => {
    sessionStorage.removeItem(key)
  }

  return { saveToSessionStorage, getFromSessionStorage, clearSessionStorage, removeItem }
}
