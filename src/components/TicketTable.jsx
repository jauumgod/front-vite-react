import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDownToLine, Check, CircleMinus, FileUp, Image, MoveDown, Printer } from 'lucide-react';
import { Modal } from 'antd';
import apiService from '../services/apiService';
import { toast } from 'sonner';

const TicketTable = ({ tickets, toggleCompleteStatus }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileselect, setFileSelect] = useState(null);
  const [nfe, setNfe] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  
  // Estado para ordenação
  const [sortConfig, setSortConfig] = useState({ key: 'criacao', direction: 'ascending' });

  const handlePrintClick = (ticketId) => {
    navigate('/print', { state: { ticketId } });
  };

  const showModal = (ticketId) => {
    setSelectedTicketId(ticketId);
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileSelect(selectedFile);
    if (selectedFile) {
      setNfe(selectedFile.name);
    }
  };
  
  const handleOk = () => {
    if (fileselect && selectedTicketId) {
      apiService.uploadNotaFiscal(nfe, fileselect, selectedTicketId)
        .then(response => {
          console.log('Arquivo enviado com sucesso! ', response.data);
          tickets.forEach(ticket => {
            if (ticket.id === selectedTicketId) {
              ticket.nf = (ticket.nf || 0) + 1;
            }
          });
          setIsModalOpen(false);
          setFileSelect(null);
          setNfe('');
          toast.success('Arquivo Anexado com sucesso!');
        })
        .catch(error => {
          console.error('Não foi possível anexar, ', error);
        });
    } else {
      console.error("Arquivo ou ticket não selecionado");
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNfe('');
    setFileSelect(null);
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="border-separate border border-slate-500 py-3">
      <thead>
        <tr>
          <th onClick={() => requestSort('sequencia')} className="cursor-pointer border border-slate-800 bg-slate-900">Nº Ticket</th>
          <th onClick={() => requestSort('empresa.nome')} className="cursor-pointer border border-slate-800 bg-slate-900">Empresa</th>
          <th onClick={() => requestSort('produto')} className="cursor-pointer border border-slate-800 bg-slate-900">Produto</th>
          <th onClick={() => requestSort('transportadora')} className="cursor-pointer border border-slate-800 bg-slate-900">Transportadora</th>
          <th onClick={() => requestSort('cliente')} className="cursor-pointer border border-slate-800 bg-slate-900">Cliente</th>
          <th onClick={() => requestSort('peso_liquido')} className="cursor-pointer border border-slate-800 bg-slate-900">Peso Líquido</th>
          <th onClick={() => requestSort('criacao')} className="cursor-pointer border border-slate-800 bg-slate-900">Data criação</th>
          <th onClick={() => requestSort('lote_leira')} className="cursor-pointer border border-slate-800 bg-slate-900">Horário</th>
          <th className="border border-slate-800 bg-slate-900">Opções</th>
        </tr>
      </thead>
      <tbody>
        {sortedTickets.map((ticket) => (
          <tr
            key={ticket.id}
            className={ticket.concluido ? "bg-slate-800" : "bg-red-500"}
          >
            <td className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}>
              {ticket.sequencia}
            </td>
            <td className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}>
              {ticket.empresa.nome}
            </td>
            <td className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}>
              {ticket.produto}
            </td>
            <td className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}>
              {ticket.transportadora}
            </td>
            <td className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}>
              {ticket.cliente}
            </td>
            <td className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}>
              {ticket.peso_liquido}
            </td>
            <td className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}>
              {ticket.criacao}
            </td>
            <td className={`border border-slate-700 text-center ${ticket.concluido ? 'hover:bg-slate-500' : 'hover:bg-red-700'}`}>
              {ticket.horario}
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
                    onClick={() => showModal(ticket.id)}
                  >
                    <FileUp className="text-blue-500" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <Modal
        title="Adicionar Nota Fiscal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
        <div>Arquivo: {nfe}</div>
      </Modal>
    </table>
  );
};

export default TicketTable;
