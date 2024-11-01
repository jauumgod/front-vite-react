import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDownToLine, Check, CircleMinus, FileUp, Image, Printer } from 'lucide-react';
import { Modal } from 'antd';
import apiService from '../services/apiService';
import { toast } from 'sonner';

const TicketTable = ({ tickets, toggleCompleteStatus }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileselect, setFileSelect] = useState(null); // Mude para null
  const [nfe, setNfe] = useState(''); // Certifique-se de que isso esteja definido
  const [selectedTicketId, setSelectedTicketId] = useState(null);



    const handlePrintClick = (ticketId) => {
    navigate('/print', { state: { ticketId } });
  };

  const showModal = (ticketId) => {
    setSelectedTicketId(ticketId);
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileSelect(selectedFile); // Corrigido para usar setFileSelect
    if (selectedFile) {
      setNfe(selectedFile.name); // Define o nfe com base no nome do arquivo
    }
  };
  
  
  const handleOk = () => {
    if (fileselect && selectedTicketId) {
      // Aqui você deve garantir que nfe é acessível
      apiService.uploadNotaFiscal(nfe, fileselect, selectedTicketId) // Certifique-se de passar o nfe aqui
        .then(response => {
          console.log('Arquivo enviado com sucesso! ', response.data);

          tickets.forEach(ticket => {
            if (ticket.id === selectedTicketId) {
              ticket.nf = (ticket.nf || 0) + 1; // Incrementa a nota fiscal
            }
          });
          
          setIsModalOpen(false);
          setFileSelect(null);
          setNfe(''); // Limpa o campo nfe
          toast.success('Arquivo Anexado com sucesso!');
        })
        .catch(error => {
          console.error('Não foi possível anexar, ', error);
        });
    } else {
      console.error("Arquivo ou ticket não selecionado");
    }
    setIsModalOpen(false);
    console.log(nfe);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNfe(''); // Limpa o campo nfe
    setFileSelect(null); // Limpa o campo de arquivo
  };



  return (
    <table className="border-separate border border-slate-500 py-3">
      <thead>
        <tr>
          <th className="border border-slate-800 bg-slate-900">Nº Ticket</th>
          <th className="border border-slate-800 bg-slate-900">Empresa</th>
          <th className="border border-slate-800 bg-slate-900">Produto</th>
          <th className="border border-slate-800 bg-slate-900">Transportadora</th>
          <th className="border border-slate-800 bg-slate-900">Cliente</th>
          <th className="border border-slate-800 bg-slate-900">Peso Líquido</th>
          <th className="border border-slate-800 bg-slate-900">Data criação</th>
          <th className="border border-slate-800 bg-slate-900">Lote</th>
          <th className="border border-slate-800 bg-slate-900">Opções</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr
            key={ticket.id}
            className={ticket.concluido ? "bg-slate-800" : "bg-red-500"}
          >
            <td
              className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}
            >
              {ticket.sequencia}
            </td>
            <td
              className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}
            >
              {ticket.empresa.nome}
            </td>
            <td
              className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}
            >
              {ticket.produto}
            </td>
            <td
              className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}
            >
              {ticket.transportadora}
            </td>
            <td
              className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}
            >
              {ticket.cliente}
            </td>
            <td
              className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}
            >
              {ticket.peso_liquido}
            </td>
            <td
              className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}
            >
              {ticket.criacao}
            </td>
            <td
              className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}
            >
              {ticket.lote_leira}
            </td>
            <td className="border-slate-700 flex space-x-2 justify-center">
              <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                <button onClick={() => handlePrintClick(ticket.id)}>
                  <Printer className='text-blue-500'/>
                </button>
              </div>
              <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                <button>
                  <Link to={"/imagem"} state={{ ticketId: ticket.id }}>
                    {ticket.imagens.length >= 1 ? (
                      <Image className="text-green-500" />
                    ) : (
                      <Image className="text-gray-400" />
                    )}
                  </Link>
                </button>
              </div>
              <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                <button onClick={() => toggleCompleteStatus(ticket.id, ticket.concluido)} className="flex rounded-md bg-slate-200 text-gray-800">
                  {ticket.concluido ? <Check className="text-green-500"/> : <CircleMinus className="text-red-500" />}
                </button>
              </div>
              <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                {ticket.nf >= 1 ? (
                  <button>
                    <Link to="/baixarnf" state={{ ticketId: ticket.id }}>
                      <ArrowDownToLine className="text-blue-400"/>
                    </Link>
                  </button>
                ) : (
                  <button 
                    className="flex rounded-md bg-slate-200 text-gray-800"
                    onClick={() => showModal(ticket.id)} // Passando ticket.id
                  >
                    <FileUp className="text-blue-400" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
        <Modal
          title="Inserir Nota Fiscal" 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel}
        >
          <input 
            type="text" 
            placeholder="Título do arquivo" 
            value={nfe} 
            onChange={(e) => setNfe(e.target.value)} 
          />
          <input 
            type="file" 
            accept=".pdf"
            onChange={handleFileChange} // Remover value={fileselect}
          />
        </Modal>
      </tbody>
    </table>
  );
};

export default TicketTable;
