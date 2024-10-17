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
            <div className="text-center p-10 mt-10 border bg-blue-950">
                <span className="text-3xl">Nome: </span>
                <span className=" text-2xl">{usuario}</span>
            </div>
        </div>
    )
}

export default UserInfo;