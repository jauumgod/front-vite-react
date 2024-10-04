import { useState, useEffect } from 'react';
import CardComponent from '../components/CardComponent';
import apiService from '../services/apiService';

const HomePage = () => {
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTickets = () => {
    apiService
      .getTickets(tickets, totalTickets)
      .then((response) => {
        setTickets(response.data.results);
        setTotalTickets(response.data.count);
        setIsLoading(false); // Atualiza para false após carregar os dados
      })
      .catch((error) => {
        console.error('Erro ao buscar os tickets:', error);
        setIsLoading(false); // Atualiza para false mesmo em caso de erro
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-800 flex flex-col py-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-12 h-12 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <span className="ml-2">Carregando tickets...</span>
        </div>
      ) : (
        <CardComponent tickets={tickets} totalTickets={totalTickets} />
      )}
    </div>
  );
};

export default HomePage;
