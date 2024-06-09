import { useEffect } from "react";
import { toast } from "react-toastify";

export const NetworkChecking = () => {
  const handleOffline = () => {
    toast.success('Network has connected')
  }

  const handleOnline = () => {
    toast.error('Network has disconnected')
  }

  useEffect(() => {
    window && window.addEventListener('offline', handleOnline)

    window && window.addEventListener('online', handleOffline)

    return () => {
      window && window.removeEventListener('offline', handleOnline)
      window && window.removeEventListener('online', handleOffline)
    }
  }, []);

  return <></>
}
