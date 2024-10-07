import { useNavigate } from 'react-router-dom';

// Definir a função LogoutUser
const logoutUser = () => {
  // Remover o token do localStorage
  localStorage.removeItem('token');
};

// Função para realizar logout e redirecionar para a tela de login
export const handleLogout = () => {
  const navigate = useNavigate(); // Usar o hook para navegação
  logoutUser(); // Executa o logout
  
  // Adicionar um delay antes do redirecionamento
  setTimeout(() => {
    navigate('/login');
  }, 2000); // 1000 ms = 1 segundo
};

export default logoutUser;
