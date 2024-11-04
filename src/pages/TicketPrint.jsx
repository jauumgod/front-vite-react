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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { ticketId } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (ticketId) {
      apiService.getTicketById(ticketId)
        .then(response => {
          setTicket(response.data);
          setHasImage(response.data.imagens && response.data.imagens.length > 0);
        })
        .catch(error => console.error('Erro ao buscar ticket:', error));
    }
  }, [ticketId]);

  if (!ticket) return <div>Carregando...</div>;

  const handlePrint = () => {
    window.print();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const generateImageName = () => {
    const randomPart = Math.floor(Math.random() * 1000);
    return `image_${Date.now()}_${randomPart}`;
  };

  const handleUpload = async (selectedImage) => {
    setIsLoading(true); // Inicia o loading
    try {
      const nome = generateImageName();
      const success = await apiService.uploadImage(nome, selectedImage, ticket.id);
      toast.success('Imagem enviada com sucesso!');
      closeModal();
      setHasImage(true); // Atualiza o estado para indicar que agora existe uma imagem
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      toast.error('Erro ao fazer upload da imagem.');
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  };




  return (
    <div>
    <div className='flex-row space-x-1'>
      <button onClick={()=> navigate(-1)} className="bg-slate-300 text-center text-slate-900 border rounded-md mt-2 ml-2 flex">
        <ChevronLeftIcon/> Voltar
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
          <div className="ticket-item">
            <strong>Lote Leira:</strong> <span>{ticket.lote_leira}</span>
          </div>
          <div className="ticket-item">
            <strong>Umidade:</strong> <span>{ticket.umidade}</span>
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
          <div className="ticket-item">
            <strong>Lote Leira:</strong> <span>{ticket.lote_leira}</span>
          </div>
          <div className="ticket-item">
            <strong>Umidade:</strong> <span>{ticket.umidade}</span>
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
          {hasImage ? (
            <span disabled className="btn-cinza">imagem anexada</span>
          ) : (
            <button className="btn-print" onClick={openModal} disabled={isLoading}>
              Inserir Imagem
            </button>
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
