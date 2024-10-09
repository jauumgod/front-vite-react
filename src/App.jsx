import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import { Toaster } from "sonner";



function App() {

const location = useLocation();
const [user, setUser] = useState(null);


const isLoginPage = location.pathname === '/login';
  return (
    <div className=" min-h-screen w-full bg-slate-800 flex  flex-col">

      {!isLoginPage && <Navbar/>}
        <Outlet context={{user, setUser}}/>
        <Toaster/>
    </div>
  )
}

export default App
