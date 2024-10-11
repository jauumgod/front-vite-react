// StatsTickets.js
import React, { useEffect } from 'react';
import apiService from '../services/apiService';
import AppContext from '../context/AppContext';

const useTickets = () => {
  const { setTotalConcluidos } = AppContext();

  const fetchDados = async () => {
    try {
      const response = await apiService.getStats();
      const { monthly_stats } = response.data;

      const totalConcluidos = monthly_stats.reduce((acc, curr) => acc + curr.concluidos, 0);
      setTotalConcluidos(totalConcluidos);
    } catch (error) {
      console.error('Erro ao buscar Stats: ', error);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  return null; // Este componente não precisa renderizar nada
};

export default useTickets;
