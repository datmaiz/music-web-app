import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import App from './App.tsx'
import { AppProvider } from "@/context";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App/>
    </AppProvider>
    <ToastContainer pauseOnFocusLoss={false} />
  </React.StrictMode>,
)
