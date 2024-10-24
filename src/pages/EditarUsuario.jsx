import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiService from "../services/apiService";
import { CircleUser } from "lucide-react";


const EditarUsuario = () =>{
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const location = useLocation();
    const { usuarioId } = location.state || {};

    useEffect(() => {
        if (usuarioId) {
          apiService.getUserById(usuarioId)
            .then(response => {
              setUsuario(response);
              console.log(response);
            })
            .catch(error => console.error('Erro ao buscar ticket:', error));
        }
      }, [usuarioId]);
    

    const checkPassword = (password, repassword) =>{
        if(password == repassword){
            console.log('Senhas coincidem')
        }
        else{
            toast.error('Senhas não conferem.')
            setPassword('');
            setRePassword('');
        }
    }
    const handleSubmit = () =>{
        checkPassword();
    };

    return(
        <div className="w-full flex justify-center mt-20 text-white">
            
            <form 
            className="bg-gray-600 shadow-md rounded-md border px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}>
            <div
            className="ml-20 mb-4">
            <CircleUser className=""/>
            </div>
            <div>
                <h2 className="text-bold text-center text-2xl mb-2">{usuario.username}</h2>
            </div>
                <div>
                    <label className="flex">Digite a senha: </label>
                    <input type="password"
                    className="rounded-md mt-2 p-2"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="******" />
                </div>
                <div className="">
                <label className="flex">Digite novamente:</label>
                    <input type="password"
                    className="rounded-md mt-2 p-2"
                    value={repassword}
                    onChange={(e)=>setRePassword(e.target.value)}
                    placeholder="******" />
                </div>
                <div className="mt-2 text-center">
                    <button type="submit"
                    className="text-center text-bold border text-gray-200 rounded-md p-2 hover:bg-gray-500"
                    >Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default EditarUsuario;