import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // ou onde você armazena o token

    if (!token) {
      navigate('/login'); // Redireciona para a página de login
    }
    // Você pode adicionar lógica para verificar a validade do token aqui, se necessário.
  }, [navigate]);
};

export default useAuth;
