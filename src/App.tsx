import './_global.css'
import {RouterProvider} from "react-router-dom";
import {PublicRoutes} from "./routes";
import { NetworkChecking } from '@/utils'

const App = () => {

  return (
    <div className='app'>
      <RouterProvider router={PublicRoutes} />
      <NetworkChecking />
    </div>
  )
}

export default App
