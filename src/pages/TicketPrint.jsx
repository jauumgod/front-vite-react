import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import './css/TicketPrint.css'; // Importa um arquivo CSS para estilização
import imagem from '../assets/logo-organics.png';

const TicketPrint = ({ ticketId }) => {
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ticketId) {
      apiService
        .getTicketById(ticketId)
        .then(response => {
          setTicket(response.data);
        })
        .catch(error => console.error('Erro ao buscar ticket:', error));
    }
  }, [ticketId]);

  if (!ticket) return <div>Carregando...</div>;

  const handlePrint = () => {
    window.print(); // Chama a função de impressão do navegador
  };

  return (
    <div>
      <div className="ticket-print-container">
      <div className='logo-impressao'>
        <img src={imagem} alt="organics-logo" width={160} height={124} />
        <h2 className="ticket-title"> {ticket.empresa.nome}</h2>
      </div>
      <h4 className='ticket-title'>Endereço: {ticket.empresa.endereco}</h4>
      <div className="ticket-details">
        <div className="ticket-item">
          <strong>Data de criação:</strong> <strong>{new Date(ticket.criacao).toLocaleDateString()}</strong>
        </div>
        <div className="ticket-item">
          <strong>Sequência:</strong> <span>{ticket.sequencia}</span>
        </div>
        <div className="ticket-item">
          <strong>Operador:</strong> <span>{ticket.operador}</span>
        </div>
        <div className="ticket-item">
          <strong>Motorista:</strong> <span>{ticket.motorista}</span>
        </div>
        <div className="ticket-item">
          <strong>Placa:</strong> <span>{ticket.placa}</span>
        </div>
        <div className="ticket-item">
          <strong>Operação:</strong> <span>{ticket.empresa.nome}</span>
        </div>
        <div className="ticket-item">
          <strong>Transportadora:</strong> <span>{ticket.transportadora}</span>
        </div>
        <div className="ticket-item">
          <strong>Produto:</strong> <span>{ticket.produto}</span>
        </div>
        <div className="ticket-item">
          <strong>Cliente:</strong> <span>{ticket.cliente}</span>
        </div>
        <div className="ticket-item">
          <strong>Peso Entrada:</strong> <span>{ticket.peso_entrada} Ton</span>
        </div>
        <div className="ticket-item">
          <strong>Peso Saída:</strong> <span>{ticket.peso_saida} Ton</span>
        </div>
        <div className="ticket-item">
          <strong>Peso Líquido:</strong> <span>{ticket.peso_liquido} Ton</span>
        </div>
        <div className='assinatura'>
          <div className="assinatura-item">
            <strong>Assinatura Motorista:</strong>
            <span>________________________________________ </span>
          </div>
          <div className="assinatura-item">
            <strong>Assinatura Operador:</strong>
            <span>________________________________________</span>
          </div>
        </div>
      </div>

    </div>
    <div className="ticket-print-container">
      <div className='logo-impressao'>
        <img src={imagem} alt="organics-logo" width={160} height={124} />
        <h2 className="ticket-title"> {ticket.empresa.nome}</h2>
      </div>
      <h4 className='ticket-title'>Endereço: {ticket.empresa.endereco}</h4>
      <div className="ticket-details">
        <div className="ticket-item">
          <strong>Data de criação:</strong> <strong>{new Date(ticket.criacao).toLocaleDateString()}</strong>
        </div>
        <div className="ticket-item">
          <strong>Sequência:</strong> <span>{ticket.sequencia}</span>
        </div>
        <div className="ticket-item">
          <strong>Operador:</strong> <span>{ticket.operador}</span>
        </div>
        <div className="ticket-item">
          <strong>Motorista:</strong> <span>{ticket.motorista}</span>
        </div>
        <div className="ticket-item">
          <strong>Placa:</strong> <span>{ticket.placa}</span>
        </div>
        <div className="ticket-item">
          <strong>Operação:</strong> <span>{ticket.empresa.nome}</span>
        </div>
        <div className="ticket-item">
          <strong>Transportadora:</strong> <span>{ticket.transportadora}</span>
        </div>
        <div className="ticket-item">
          <strong>Produto:</strong> <span>{ticket.produto}</span>
        </div>
        <div className="ticket-item">
          <strong>Cliente:</strong> <span>{ticket.cliente}</span>
        </div>
        <div className="ticket-item">
          <strong>Peso Entrada:</strong> <span>{ticket.peso_entrada} Ton</span>
        </div>
        <div className="ticket-item">
          <strong>Peso Saída:</strong> <span>{ticket.peso_saida} Ton</span>
        </div>
        <div className="ticket-item">
          <strong>Peso Líquido:</strong> <span>{ticket.peso_liquido} Ton</span>
        </div>
        <div className='assinatura'>
          <div className="assinatura-item">
            <strong>Assinatura Motorista:</strong>
            <span>________________________________________ </span>
          </div>
          <div className="assinatura-item">
            <strong>Assinatura Operador:</strong>
            <span>________________________________________</span>
          </div>
        </div>
      </div>
      <button className="btn-print" onClick={handlePrint}>Imprimir Ticket</button>
    </div>
    </div>
  );
};

export default TicketPrint;