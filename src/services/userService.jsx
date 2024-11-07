import axios from 'axios';
import authService from './authService';

const API_URL = 'http://10.1.1.3:8090/api';

const createUser = (username, password, empresa, grupos) => {
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
    empresa: [empresa],
    grupos,
  };
  // Enviando os dados para a API
  return axios.post(url, usuario, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createEmpresa = (empresa, cnpj, endereco, cidade) =>{
  const url = `${API_URL}/empresas/`;
  const token = authService.getToken();

  if (!token) {
    return Promise.reject(new Error('Usuário não autenticado.'));
  } 
  const newEmpresa = {
    empresa,cnpj, endereco, cidade,
  };
  return axios.post(url,newEmpresa,{
    headers:{
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createUser,
  createEmpresa,
};
