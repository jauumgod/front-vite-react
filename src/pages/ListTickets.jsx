import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, CircleMinus, Image, Printer } from 'lucide-react';
import ButtonComponent from "../components/ButtonComponent";
import H2Component from "../components/H2Component";
import apiService from '../services/apiService';
import withAuth from '../utils/withAuth';

const ListTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTickets = () => {
    setIsLoading(true);
    apiService.getTickets() // Supondo que você tenha uma função para buscar todos os tickets
      .then(response => {
        setTickets(response.data.results);
      })
      .catch(error => console.error('Erro ao buscar os tickets:', error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Função para alterar o status do ticket (concluído ou não)
  const toggleCompleteStatus = async (ticketId, currentStatus) => {
    try {
      await apiService.updateTicketStatus(ticketId, { concluido: !currentStatus }); // Faz uma requisição PATCH
      fetchTickets(); // Recarrega os tickets após a atualização
    } catch (error) {
      console.error('Erro ao atualizar o status do ticket:', error);
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
              <th className="border border-slate-800 bg-slate-900">Empresa</th>
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
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.empresa.nome}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.produto}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.transportadora}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.cliente}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.peso_liquido}</td>
                <td className="border border-slate-700 hover:bg-slate-500 text-center">{ticket.criacao}</td>
                <td className="border-slate-700 flex space-x-1">
                  <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                  <Link to={"/print"} state={{ ticketId: ticket.id }}>
                    <Printer className="text-orange-500" />
                  </Link>
                  </div>
                  <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                  <Link to={`/imagens/${ticket.id}`} state={{ ticketId: ticket.id }}>
                    <Image className="text-blue-500" />
                  </Link>
                  </div>
                  <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                  <button
                    onClick={() => toggleCompleteStatus(ticket.id, ticket.concluido)}
                    className="flex rounded-md bg-slate-200 p-2 text-gray-800"
                  >
                    {ticket.concluido ? (
                      <Check className="text-green-500" />
                    ) : (
                      <CircleMinus className="text-red-500" />
                    )}
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default withAuth(ListTickets);
