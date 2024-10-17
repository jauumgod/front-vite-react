import React, { useState, useEffect} from 'react';
import { toast } from 'sonner';
import userService from '../services/userService';
import apiService from '../services/apiService';
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { useNavigate } from 'react-router-dom';

const NovoUsuario = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [error, setError] = useState('');
  const [empresas, setEmpresas] = useState([]);
  const [grupos, setGrupos] = useState([]);

  const navigate = useNavigate();

  const fetchEmpresas = async () =>{
    try{
      const response = await apiService.getEmpresas();
      setEmpresas(response.data.results || response.data);
    } catch(error){
      console.error("Erro ao buscar empresas: ", error);
    }
  };

  const fetchGrupos  = async () =>{
    try{
        const response = await apiService.getGrupos();
        setGrupos(response.data.results || response.data);
    } catch(error){
      console.error("Erro ao buscar grupos: ", error);
    }
  };

  useEffect(()=>{
    fetchEmpresas();
    fetchGrupos();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrigido para invocar corretamente o preventDefault

    // Validação das senhas
    if (password !== repassword) {
      toast.error('As senhas não conferem.');
      setPassword('');
      setRePassword('');
      return;
    }
    
    
    try {
        
        // Chama o serviço para criar o usuário
        const response = await userService.createUser(username, password, empresa, selectedGroup);
        console.log(response);
        toast.success('Usuário criado com sucesso!');
        setUsername('');
        setPassword('');
        setRePassword('');
        setEmpresa('');
        setSelectedGroup('');
        navigate("/config");
    } catch (error) {
      // Trata o erro retornado do serviço
      console.error("Erro na requisição:", error.response.data);

      setError(error.response?.data?.error || 'Erro ao criar usuário');
      toast.error(error.response?.data?.error || 'Erro ao criar usuário');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-800 flex justify-center">
      <div className="w-[450px] space-y-4 pt-2 mt-4">
        <h2 className="text-center text-white text-3xl">Criar Novo Usuário</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-600">{error}</div>}
          <div className="p-2">
            <InputComponent
              placeholder="Digite o usuário"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
          </div>
          <div className="p-2">
            <InputComponent
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>
          <div className="p-2">
            <InputComponent
              type="password"
              placeholder="Repita a senha"
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)}
              required={true}
            />
          </div>
          <div className="p-2 flex justify-center">
            <select className='p-2 rounded-md text-center'
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                >
                  <option value="">Selecione uma empresa</option>
                    {empresas.length > 0 ?(
                        empresas.map((empresa)=>(
                            <option className='rounded-md' key={empresa.id} 
                            value={empresa.id}>{empresa.nome}</option>
                        ))
                    ): (
                        <option>Nenhuma empresa encontrada.</option>
                    )}
                    required
            </select>
          </div>
          <div className="p-2 flex justify-center">
      <select
        className="p-2 rounded-md text-center"
        value={selectedGroup} // Usar o estado `selectedGroup` para o valor selecionado
        onChange={(e) => setSelectedGroup(e.target.value)} // Atualiza o valor selecionado
      >
        <option value="">Selecione um Grupo</option>
        {grupos.length > 0 ? (
          grupos.map((grupo) => (
            <option
              className="rounded-md"
              key={grupo.id}
              value={grupo.id} // O valor será o ID do grupo
            >
              {grupo.nome} {/* Nome do grupo */}
            </option>
          ))
        ) : (
          <option>Nenhum grupo encontrado.</option>
        )}
      </select>
    </div>
          <div className="p-2 text-center">
            <ButtonComponent type="submit" nameButton="Criar Usuário" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoUsuario;
