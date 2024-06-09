export const useLocalStorage = () => {
  function getItem<T>(key: string): T | null {
    const itemString = localStorage.getItem(key)
    if (!itemString) return null

    return JSON.parse(itemString) as T
  }

  function setItem<T>(key: string, value: T) {
    if (!key) return

    localStorage.setItem(key, JSON.stringify(value))
  }

  function removeItem(key: string): void {
    localStorage.removeItem(key)
  }

  return { getItem, setItem, removeItem }
}
