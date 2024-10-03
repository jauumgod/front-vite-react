import ButtonComponent from "../components/ButtonComponent";
import H2Component from "../components/H2Component";
import apiService from '../services/apiService';
import React, { useState, useEffect } from 'react';


const ListTickets = () =>{

    const [tickets, setTickets] = useState([]);
    const [operacao, setOperacao] = useState('');
    const [sequencia, setSequencia] = useState('');
    const [criacao, setCriacao] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTickets, setTotalTickets] = useState(0);

    const fetchTickets = () => {
        apiService.getTickets(operacao, sequencia, criacao, currentPage, 5)
          .then(response => {
            setTickets(response.data.results);
            setTotalTickets(response.data.count);
          })
          .catch(error => console.error('Erro ao buscar os tickets:', error));
      }

    useEffect(() => {
    fetchTickets();
    }, [currentPage, operacao, sequencia, criacao]);

    const totalPages = Math.ceil(totalTickets / 5);

    
    return(
        <div className="min-h-screen w-full bg-slate-600 rounded-md shadow flex flex-col text-white">
            <H2Component title="Tickets"/>
            <table className="border-separate border border-slate-500 py-3">
                <thead>
                    <tr>
                        <th className="border border-slate-800 bg-slate-800">Nº Ticket</th>
                        <th className="border border-slate-800 bg-slate-800">Placa</th>
                        <th className="border border-slate-800 bg-slate-800">Produto</th>
                        <th className="border border-slate-800 bg-slate-800">Transportadora</th>
                        <th className="border border-slate-800 bg-slate-800">Cliente</th>
                        <th className="border border-slate-800 bg-slate-800">Peso Líquido</th>
                        <th className="border border-slate-800 bg-slate-800">Lote Leira</th>
                        <th className="border border-slate-800 bg-slate-800">Opções</th>
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
                        <td className=" border-slate-700"><ButtonComponent color="bg-slate-800" nameButton = "Imprimir"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex p-2 px-5 py-2 text-center justify-end">
                <div className="p-2">
                <ButtonComponent nameButton = "Inicio"/>
                </div>
                <div className="p-2">
                <ButtonComponent nameButton = "1"/>
                </div>
                <div className="p-2">
                <ButtonComponent nameButton = "2"/>
                </div>
                <div className="p-2">
                <ButtonComponent nameButton = "3"/>
                </div>
                
                <div className="p-2">
                <ButtonComponent nameButton = "Fim"/>
                </div>
            </div>
        </div>
    )
}

export default ListTickets;