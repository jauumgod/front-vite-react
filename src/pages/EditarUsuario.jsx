import { PersonStanding } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import apiService from "../services/apiService";


const EditarUsuario = () =>{
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const location = useLocation();
    const { usuarioId } = location.state || {};

    useEffect(() => {
        if (usuarioId) {
          apiService.getUsers(usuarioId)
            .then(response => {
              setUsuario(response.data);
            })
            .catch(error => console.error('Erro ao buscar ticket:', error));
        }
      }, [usuarioId]);
    
      if (!ticket) return <div>Carregando...</div>;

    const checkPassword = (password, repassword) =>{
        if(password == repassword){
            console.log('Senhas coincidem')
            toast.info('Senhas Coincidem.')
        }
        else{
            toast.error('Senhas não conferem.')
            setPassword('');
            setRePassword('');
        }
    }
    const handleSubmit = () =>{
        
    };

    return(
        <div>
            <h2>Informações so usuário</h2>
            <div>
                <PersonStanding/>
            </div>
            <div>
                <h3>{usuario.nome}</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Digite a senha: </label>
                    <input type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="******" />
                </div>
                <div>
                <label htmlFor="">Digite novamente:</label>
                    <input type="password"
                    value={repassword}
                    onChange={(e)=>setRePassword(e.target.value)}
                    placeholder="******" />
                </div>
                <div>
                    <button type="submit"
                    className="text-center text-bold "
                    >Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default EditarUsuario;