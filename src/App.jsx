import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';



function App() {

const location = useLocation();
const [user, setUser] = useState(null);

const isLoginPage = location.pathname === '/login';
  return (
    <div className=" min-h-screen w-full bg-slate-800 flex justify-center flex-col">
      {!isLoginPage && <Navbar/>}
        <Outlet context={{user, setUser}}/>
    </div>
  )
}

export default App
