import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";

export const RequiredAuth = () => {
  const user = useAuth()
  return user && !user.isAdmin ? <Outlet /> : <Navigate to={'/login'} />
}

export const RequiredAdmin = () => {
  const user = useAuth()

  return user && user.isAdmin ? <Outlet /> : <Navigate to={'/login'} />
}
