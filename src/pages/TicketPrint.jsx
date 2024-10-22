import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import './css/TicketPrint.css';
import imagem from '../assets/logo-organics.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import { toast } from 'sonner';



const TicketPrint = () => {
  const [ticket, setTicket] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar o modal
  const location = useLocation();
  const { ticketId } = location.state || {}; // Obtém o ticketId
  const hasImage = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (ticketId) {
      apiService.getTicketById(ticketId)
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

  const openModal = () => {
    setModalIsOpen(true);
    <ImageModal open={open}/>
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


const generateImageName = () => {
  // Gerando um nome aleatório baseado na data e número aleatório
  const randomPart = Math.floor(Math.random() * 1000); // Gera um número aleatório entre 0 e 999
  return `image_${Date.now()}_${randomPart}`; // Exemplo: image_1697530913913_123
};

const handleUpload = async (selectedImage) => {
  try {
    const nome = generateImageName(); 
    const ticketId = ticket.id;  // O id do ticket que você já tem no estado
    const success = await apiService.uploadImage(nome, selectedImage, ticketId);
    toast.success('Imagem enviada com sucesso!');
    closeModal();  // Fecha o modal
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    toast.error('Erro ao fazer upload da imagem.');  // Mensagem de erro
  }
};




  return (
    <div>
    <div>
      <button onClick={()=> navigate(-1)} className='bg-slate-100 rounded-md py-1 px-2'>
        <ChevronLeftIcon/>
      </button>
    </div>
      <div className="ticket-print-container">
        <div className="logo-impressao">
          <img src={imagem} alt="organics-logo" width={160} height={124} />
          <h2 className="ticket-title"> {ticket.empresa.nome}</h2>
        </div>
        <h4 className="ticket-title">Endereço: {ticket.empresa.endereco}</h4>
        <div className="ticket-details">
          <div className="ticket-item">
            <strong>Data de criação:</strong> <strong>{ticket.criacao}</strong>
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
          <div className="assinatura">
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

      {/* Segundo bloco de impressão */}
      <div className="ticket-print-container">
        <div className="logo-impressao">
          <img src={imagem} alt="organics-logo" width={160} height={124} />
          <h2 className="ticket-title"> {ticket.empresa.nome}</h2>
        </div>
        <h4 className="ticket-title">Endereço: {ticket.empresa.endereco}</h4>
        <div className="ticket-details">
          <div className="ticket-item">
            <strong>Data de criação:</strong> <strong>{ticket.criacao}</strong>
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
          <div className="assinatura">
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
        <div className='flex'>
          {hasImage? (
            <button className="btn-print" onClick={openModal}>Inserir Imagem</button>
          ): (
            <button disabled className="btn-print" onClick={openModal}>Inserir Imagem</button>
          )}
          <button className="btn-green" onClick={handlePrint}>Imprimir Ticket</button>
        </div>
      </div>
      {modalIsOpen && (
          <ImageModal open={modalIsOpen} onClose={closeModal} onSave={handleUpload} />
      )}
    </div>
  );
};

export default TicketPrint;
