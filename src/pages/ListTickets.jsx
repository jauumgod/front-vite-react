// ListTickets.jsx
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import H2Component from "../components/H2Component";
import apiService from '../services/apiService';
import React, { useState, useEffect } from 'react';

const ListTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [operacao, setOperacao] = useState('');
  const [sequencia, setSequencia] = useState('');
  const [criacao, setCriacao] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTickets, setTotalTickets] = useState(0);

  // Função para buscar os tickets com paginação
  const fetchTickets = () => {
    apiService.getTickets(operacao, sequencia, criacao, currentPage, 5)
      .then(response => {
        setTickets(response.data.results);
        setTotalTickets(response.data.count);
      })
      .catch(error => console.error('Erro ao buscar os tickets:', error));
  };

  useEffect(() => {
    fetchTickets();
  }, [currentPage, operacao, sequencia, criacao]);

  // Calculando o número total de páginas com base no total de tickets
  const totalPages = Math.ceil(totalTickets / 5);

  // Função para mudar a página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-800 rounded-md shadow flex flex-col text-white">
      <H2Component title="Tickets" />
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
              <td className="border-slate-700"><Link  setSelectedTicketId ={ticket.id} to={"/print"}><ButtonComponent  color="bg-slate-800" nameButton="Imprimir" /></Link></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Componente de Paginação */}
      <div className="flex p-4 text-center justify-end space-x-2">
        {/* Botão para ir para a primeira página */}
        <ButtonComponent
          nameButton="Início"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        
        {/* Botão para página anterior */}
        <ButtonComponent
          nameButton="Anterior"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {/* Botões de Paginação Paginados */}
        {Array.from({ length: totalPages }, (_, index) => (
          <ButtonComponent
            key={index + 1}
            nameButton={(index + 1).toString()}
            onClick={() => handlePageChange(index + 1)}
            active={currentPage === index + 1} // Indicar a página ativa
          />
        ))}

        {/* Botão para próxima página */}
        <ButtonComponent
          nameButton="Próxima"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />

        {/* Botão para ir para a última página */}
        <ButtonComponent
          nameButton="Fim"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default ListTickets;
