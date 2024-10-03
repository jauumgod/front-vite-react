import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate do react-router-dom
import authService from "../services/authService";
import InputComponent from "../components/InputComponent";
import ButtonComponent from '../components/ButtonComponent';



const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await authService.login(username, password);
      setUser(user);
      navigate('/home'); // Redireciona para a rota '/dashboard' após login bem-sucedido
    } catch (error) {
      setError(error.message);
      console.log(username, password);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen w-full bg-slate-800 flex justify-center py-40">
        {error && <div className="alert alert-danger">{error}</div>}
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
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
         {loading ? 'Carregando...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;