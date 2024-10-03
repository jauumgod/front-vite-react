import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ListTickets from './pages/ListTickets.jsx'
import CreateTicket from './pages/CreateTicket.jsx'
import PrintTicket from './pages/PrintTicket.jsx'
import HomePage from './pages/HomePage.jsx'
import Configuracoes from './pages/Configuracoes.jsx'
import LoginPage from './pages/LoginPage.jsx'

const AppWrapper = () =>{
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
          path: "/login",
          element: <LoginPage setUser={setUser} />
        },
        {
          path: "/home",
          element:<HomePage />
        },
        {
          path: "/novo",
          element:<CreateTicket/>
        },
        {
          path: "/tickets",
          element:<ListTickets/>
        },
        {
          path: "/print",
          element:<PrintTicket/>
        },
        {
          path: "/config",
          element:<Configuracoes/>
        },
      ]
    }
  ]);
  return <RouterProvider router={router}/>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
<AppWrapper/>
  </StrictMode>,
)
