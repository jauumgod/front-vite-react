import axios from 'axios';
import authService from './authService';

const API_URL = 'http://127.0.0.1:8000/api'; // Base URL da API



const getTickets = (operacao = '', sequencia = '', criacao = '', page = 1, limit = 5) => {
  let url = `${API_URL}/tickets/?page=${page}&limit=${limit}`; // Adiciona o filtro concluido=false
  const params = [];

  if (operacao) params.push(`operacao=${operacao}`);
  if (sequencia) params.push(`sequencia=${sequencia}`);
  if (criacao) params.push(`criacao=${criacao}`);

  if (params.length > 0) {
    url += '&' + params.join('&');
  }

  const token = authService.getToken();
  if (!token) {
    return Promise.reject(new Error('Usuário não está autenticado'));
  }

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Função para atualizar o status de um ticket
const updateTicketStatus = (ticketId, data) => {
  const token = authService.getToken(); // Pega o token de autenticação
  if (!token) {
    return Promise.reject(new Error('Usuário não está autenticado'));
  }

  return axios.patch(`${API_URL}/tickets/${ticketId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Função para buscar um ticket por ID
const getTicketById = (ticketId) => {
  const token = authService.getToken();
  if (!token) {
    return Promise.reject(new Error('Usuário não está autenticado'));
  }

  return axios.get(`${API_URL}/tickets/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Função para buscar usuários
const getUsers = () => {
  const url = `${API_URL}/users/`;

  const token = authService.getToken();
  if (!token) {
    return Promise.reject(new Error('Usuário não está autenticado'));
  }

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Função para buscar empresas
const getEmpresas = () => {
  const url = `${API_URL}/empresas/`;

  const token = authService.getToken();
  if (!token) {
    return Promise.reject(new Error('Usuário não está autenticado'));
  }

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getStats = () =>{
  const url = `${API_URL}/tickets/stats/`;

  const token = authService.getToken();
  if (!token) {
    return Promise.reject(new Error('Usuário não está autenticado'));
  }

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


const apiService = {
  getUsers,
  getEmpresas,
  getTicketById,
  getTickets,
  getStats,
  updateTicketStatus,
};

export default apiService;