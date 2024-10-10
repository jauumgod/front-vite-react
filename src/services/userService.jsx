import axios from 'axios';
import authService from './apiService';

const API_URL = 'http://127.0.0.1:8000/api';

const createUser = (username, password, empresa) => {
  const url = `${API_URL}/users/`;
  const token = authService.getToken();

  // Verificação se o usuário está autenticado
  if (!token) {
    return Promise.reject(new Error('Usuário não autenticado.'));
  }

  // Definindo os dados do novo usuário
  const usuario = {
    username,
    password,
    empresas: [empresa],
  };

  // Enviando os dados para a API
  return axios.post(url, usuario, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createUser,
};
