
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


const API_URL = 'http://10.1.1.3:8090/api'; // Base URL da API

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, { username, password });
    const { access, refresh, user_id, username: userUsername, grupo } = response.data;

    const user = {
      id: user_id,
      username: userUsername,
    };
    console.log(response.data);
    // Salva o token e o refresh token no localStorage
    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('username', userUsername);
    localStorage.setItem('grupo', grupo);

    // Define a data de expiração para 1 dia após o login
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    localStorage.setItem('tokenExpiration', expirationDate.toISOString());

    return user; // Retorna o usuário após o login
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || 'Erro ao fazer login, tente novamente.'
    );
  }
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getUserGroup = ()=>{
  return localStorage.setItem('grupo');
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Hora atual em segundos
  return decoded.exp > currentTime; // Retorna true se o token não estiver expirado
};


const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  localStorage.removeItem('tokenExpiration');
};

const authService = {
  login,
  getToken,
  isAuthenticated,
  getUserGroup,
  logout, // Adiciona a função de logout
};

export default authService;
