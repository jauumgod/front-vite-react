import React from 'react';
import { Link } from 'react-router-dom';
import { Check, CircleMinus, Image, Printer } from 'lucide-react';

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
            <td className="border-slate-700 flex space-x-2">
              <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                <button >
                  <Link to={"/print"} state={{ ticketId: ticket.id }}>
                    <Printer className="text-blue-500" />
                  </Link>
                </button>
              </div>
              <div className="flex rounded-md bg-slate-200 p-2 text-gray-800">
                <button >
                  <Link to={`/imagens/${ticket.id}`} state={{ ticketId: ticket.id }}>
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketTable;
