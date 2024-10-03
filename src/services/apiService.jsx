import axios from "axios";


const API_URL = 'http://127.0.0.1:8000/api'; 

const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, { username, password });
      const { access, refresh, user_id, username: userUsername } = response.data;
  
      const user = {
        id: user_id,
        username: userUsername,
      };
  
      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('username', userUsername);
  
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
    const token = getToken();
    return !!token; // Retorna true se o token estiver presente, caso contrário, false
  };
  const getTickets = (operacao = '', sequencia = '', criacao = '', page = 1, limit = 5) => {
    let url = `${API_URL}/tickets/?page=${page}&limit=${limit}`;
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
  
  const authService = {
    login,
    getToken,
    isAuthenticated,
    getEmpresas,
    getTicketById,
    getTickets,
  };
  
  export default authService;