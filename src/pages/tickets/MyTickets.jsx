import React, { useState, useEffect } from 'react';
import ButtonComponent from "../../components/ButtonComponent";
import H2Component from "../../components/H2Component";
import apiService from '../../services/apiService';
import withAuth from '../../utils/withAuth';
import SearchComponent from '../../components/SearchComponent';
import { ArrowDownToLine, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ticketsPerPage] = useState(5);

  const fetchTickets = (page = currentPage) => {
    setIsLoading(true);
    apiService.getTicketsByUser(page)
      .then(response => {
        setTickets(response.data.results);
        setTotalPages(Math.ceil(response.data.count / ticketsPerPage)); // Calcula o número total de páginas com base no total de resultados
      })
      .catch(error => console.error('Erro ao buscar os tickets:', error))
      .finally(() => setIsLoading(false));
  };
  
  

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage]);

  const handleSearch = ({ cliente, sequencia, startDate, endDate }) => {
    setIsLoading(true);
    console.log(sequencia, startDate, endDate);
    apiService.getFilteredTickets({cliente, sequencia, startDate, endDate })
      .then((data) => {
        setTickets(data.results);  // Atualiza os tickets com os resultados da busca
        setTotalPages(Math.ceil(data.count / ticketsPerPage));  // Atualiza o total de páginas
      })
      .catch((error) => {
        console.error('Erro ao buscar tickets:', error);
      })
      .finally(() => setIsLoading(false)); // Remove o estado de carregamento
  };


  return (
    <div className="min-h-screen w-full bg-slate-800 rounded-md shadow flex flex-col text-white mt-20">
      <div className='flex text-center justify-center space-x-5'>
      <H2Component title="Tickets" />
      </div>
      <div className='flex text-center justify-center space-x-5'> 
        <SearchComponent onSearch={handleSearch}/>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-12 h-12 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <span className="ml-2">Carregando tickets...</span>
        </div>
      ) : (
       
        <table className="border-separate border border-slate-500 py-3 p-4">
          <thead>
            <tr>
              <th className="border border-slate-800 bg-slate-900">Nº Ticket</th>
              <th className="border border-slate-800 bg-slate-900">Empresa</th>
              <th className="border border-slate-800 bg-slate-900">Produto</th>
              <th className="border border-slate-800 bg-slate-900">Transportadora</th>
              <th className="border border-slate-800 bg-slate-900">Cliente</th>
              <th className="border border-slate-800 bg-slate-900">Peso Líquido</th>
              <th className="border border-slate-800 bg-slate-900">Lote Leira</th>
              <th className="border border-slate-800 bg-slate-900">Data Criação</th>
              <th className="border border-slate-800 bg-slate-900">Options</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.sequencia}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.empresa.nome}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.produto}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.transportadora}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.cliente}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.peso_liquido}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.lote_leira}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.criacao}</td>
                <td>
                <div className="rounded-md p-2 text-gray-800 space-x-2">
                  <button className=" bg-slate-200 p-2 text-gray-800">
                    <Link to={"/print"} state={{ ticketId: ticket.id }}>
                      <Printer className="text-blue-500" />
                    </Link>
                  </button>
                {ticket.nf >= 1 ?
                <button className=" bg-slate-200 p-2 text-gray-800">
                    <Link to="/baixarnf" state={{ ticketId: ticket.id }}>
                      <ArrowDownToLine className="text-green-500"/>
                    </Link>
                </button> : <button  className='bg-slate-200 p-2 text-gray-800'><ArrowDownToLine className="text-slate-400 "/></button>}
              </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

<div className="flex p-2 px-5 py-2 text-center justify-end">
  <div className="p-2">
    <ButtonComponent nameButton="Início" onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
  </div>
  <div className="p-2">
    <ButtonComponent nameButton="Anterior" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
  </div>
  <div className="p-2">
    <ButtonComponent nameButton="Próximo" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
  </div>
  <div className="p-2">
    <ButtonComponent nameButton="Fim" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
  </div>
</div>

    </div>
  );
};

export default withAuth(MyTickets);
