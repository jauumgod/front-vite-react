import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownToLine, Check, CircleMinus, FileUp, Image, Printer } from 'lucide-react';

const TicketTable = ({ tickets, toggleCompleteStatus }) => {
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
                <button>
                  <Link to={"/print"} state={{ ticketId: ticket.id }}>
                    <Printer className="text-blue-500" />
                  </Link>
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
                  {ticket.concluido ? <Check className="text-green-500" /> : <CircleMinus className="text-red-500" />}
                </button>
              </div>
              <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                <button 
                      className="flex rounded-md bg-slate-200 text-gray-800" 
                      disabled // Aqui o botão será desabilitado
                    >
                      <FileUp className="text-gray-400" />
                </button>
                  {/* {ticket.nf ? (
                    <button 
                      className="flex rounded-md bg-slate-200 text-gray-800" 
                      disabled // Aqui o botão será desabilitado
                    >
                      <FileUp className="text-blue-400" />
                    </button>
                  ) : (
                    <button>
                      <Link to="/baixarnf" state={{ ticketId: ticket.id }}>
                        <ArrowDownToLine className="text-blue-400" />
                      </Link>
                    </button>
                  )} */}
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketTable;
