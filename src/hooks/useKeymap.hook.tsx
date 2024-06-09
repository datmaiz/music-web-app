import { useEffect } from "react";

export const useKeymap = (handler: (event: KeyboardEvent) => void, key: string) => {

  const handleKeyDown = (event: KeyboardEvent) => {
    handler(event)
    if (key.toLowerCase() === event.key.toLowerCase()) {
      handler(event)
    }
  }

  useEffect(() => {
    window && window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handler]);
}