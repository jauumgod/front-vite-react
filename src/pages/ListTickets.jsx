import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import withAuth from '../utils/withAuth';
import { toast } from 'sonner';
import TicketTable from '../components/TicketTable';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import SearchComponent from '../components/SearchComponent';

const ListTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ticketsPerPage] = useState(5);

  const fetchTickets = (page = currentPage) => {
    setIsLoading(true);
    apiService.getTickets('', '', '', page)
      .then(response => {
        setTickets(response.data.results);
        setTotalPages(Math.ceil(response.data.count / ticketsPerPage));
      })
      .catch(error => console.error('Erro ao buscar os tickets:', error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage]);

  const handleSearch = ({ sequencia, startDate, endDate }) => {
    setIsLoading(true);
    console.log(sequencia, startDate, endDate);
    apiService.getFilteredTickets({ sequencia, startDate, endDate })
      .then((data) => {
        setTickets(data.results);  // Atualiza os tickets com os resultados da busca
        setTotalPages(Math.ceil(data.count / ticketsPerPage));  // Atualiza o total de páginas
      })
      .catch((error) => {
        console.error('Erro ao buscar tickets:', error);
      })
      .finally(() => setIsLoading(false)); // Remove o estado de carregamento
  };
  
  

  const toggleCompleteStatus = async (ticketId, currentStatus) => {
    try {
      await apiService.updateTicketStatus(ticketId, { concluido: !currentStatus });
      fetchTickets();
      toast.success(currentStatus ? 'Ticket marcado como não concluído!' : 'Ticket marcado como concluído!');
    } catch (error) {
      console.error('Erro ao atualizar o status do ticket:', error);
      toast.error('Erro ao atualizar o status do ticket.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-800 rounded-md shadow flex flex-col text-white">
      <h2 className="text-2xl font-bold text-center mb-4">Tickets</h2>
      <div className='flex justify-center'>
        <SearchComponent onSearch={handleSearch} />
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <TicketTable tickets={tickets} toggleCompleteStatus={toggleCompleteStatus} />
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default withAuth(ListTickets);
