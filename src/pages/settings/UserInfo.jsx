import { useEffect, useState } from "react";


const UserInfo = () =>{
    const [usuario, setUsuario] = useState('');
    const user = localStorage.getItem('username')

    useEffect(()=>{
        setUsuario(user);

    },[]);

    return(
        <div className=" text-white">
            <h3 className="text-center text-3xl text-bold mt-4"> Informações do Usuário</h3>
            <div className="text-center p-2 mt-10 mr-10 ml-10 border bg-blue-950">
                <span className="hover:text-slate-400">Nome: </span>
                <span className="hover:text-slate-400">{usuario}</span>
            </div>
        </div>
    )
}

export default UserInfo;