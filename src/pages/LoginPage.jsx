import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from "../services/authService";
import InputComponent from "../components/InputComponent";
import AppContext from "../context/AppContext";
import { MoveRight } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {setUser} = useContext(AppContext);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await authService.login(username, password);
      setUser(user);
      try{
        navigate('/home');
      }
      catch(error){
        console.log('erro ao navegar: ', error);
      }

    } catch (error) {
      setError(error.message);
      console.log(error.message);
      toast.error('Falha ao efetuar login: ', error)
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen w-full bg-slate-800 flex justify-center py-40">
      <form onSubmit={handleSubmit} className="w-[450px] space-y-4">
        <h2 className=" text-slate-100 font-bold text-center text-3xl">Login</h2>
        <InputComponent
          type="text"
          placeholder="Digite seu e-mail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputComponent
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isPassword={true}
          required
        />
        <button
          type="submit"
          className="  flex justify-center w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
         {loading ? 'Carregando...' : 'Login ' }
         <MoveRight className='ml-4 ' />
        </button>
      </form>
    </div>
  );
};

export default LoginPage;