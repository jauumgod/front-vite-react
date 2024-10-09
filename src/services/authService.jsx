// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Base URL da API

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, { username, password });
    const { access, refresh, user_id, username: userUsername } = response.data;

    const user = {
      id: user_id,
      username: userUsername,
    };

    // Salva o token e o refresh token no localStorage
    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('username', userUsername);

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

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');

  // Se não houver token ou data de expiração, o usuário não está autenticado
  if (!token || !tokenExpiration) {
    return false;
  }

  // Verifica se o token expirou
  const currentDate = new Date();
  const expirationDate = new Date(tokenExpiration);

  if (currentDate > expirationDate) {
    // Se o token expirou, o usuário não está autenticado
    return false;
  }

  return true;
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
  logout, // Adiciona a função de logout
};

export default authService;
