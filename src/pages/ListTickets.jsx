import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import H2Component from "../components/H2Component";
import apiService from '../services/apiService';
import React, { useState, useEffect } from 'react';
import { Image, Printer } from 'lucide-react'; // Importando os ícones
import withAuth from '../utils/withAuth';

const ListTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [operacao, setOperacao] = useState('');
  const [sequencia, setSequencia] = useState('');
  const [criacao, setCriacao] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTickets, setTotalTickets] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTickets = () => {
    setIsLoading(true);
    apiService.getTickets(operacao, sequencia, criacao, currentPage, 7)
      .then(response => {
        setTickets(response.data.results);
        setTotalTickets(response.data.count);
      })
      .catch(error => console.error('Erro ao buscar os tickets:', error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchTickets();
  }, [currentPage, operacao, sequencia, criacao]);

  const totalPages = Math.ceil(totalTickets / 7);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-800 rounded-md shadow flex flex-col text-white">
      <H2Component title="Tickets" />
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-12 h-12 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <span className="ml-2">Carregando tickets...</span>
        </div>
      ) : (
        <table className="border-separate border border-slate-500 py-3">
          <thead>
            <tr>
              <th className="border border-slate-800 bg-slate-900">Nº Ticket</th>
              <th className="border border-slate-800 bg-slate-900">Placa</th>
              <th className="border border-slate-800 bg-slate-900">Produto</th>
              <th className="border border-slate-800 bg-slate-900">Transportadora</th>
              <th className="border border-slate-800 bg-slate-900">Cliente</th>
              <th className="border border-slate-800 bg-slate-900">Peso Líquido</th>
              <th className="border border-slate-800 bg-slate-900">Lote Leira</th>
              <th className="border border-slate-800 bg-slate-900">Opções</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.sequencia}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.placa}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.empresa.nome}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.transportadora}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.cliente}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.peso_liquido}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.criacao}</td>
                <td className="border-slate-700 flex space-x-2">
                <div className="flex rounded-md bg-slate-200 p-2 px-2 text-gray-800">
                  <Link to={"/print"} state={{ ticketId: ticket.id }}>
                    <Printer className="w-4 h-4 mr-1" />
                  </Link>
                </div>
                <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                  <Link to={`/imagens/${ticket.id}`} state={{ ticketId: ticket.id }}>
                    <Image className="w-4 h-4 mr-1" />
                  </Link>
                </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isLoading && (
        <div className="flex p-4 text-center justify-end space-x-2">
          <ButtonComponent
            nameButton="Início"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <ButtonComponent
            nameButton="Anterior"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <ButtonComponent
              key={index + 1}
              nameButton={(index + 1).toString()}
              onClick={() => handlePageChange(index + 1)}
              active={currentPage === index + 1} 
            />
          ))}
          <ButtonComponent
            nameButton="Próxima"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <ButtonComponent
            nameButton="Fim"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default withAuth(ListTickets);
