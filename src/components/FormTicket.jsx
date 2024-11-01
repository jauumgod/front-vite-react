import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AppContext from '../context/AppContext';

const FormTicket = () => {
  const [placa, setPlaca] = useState('');
  const [produto, setProduto] = useState('');
  const [transportadora, setTransportadora] = useState('');
  const [motorista, setMotorista] = useState('');
  const [operador, setOperador] = useState('');
  const [cliente, setCliente] = useState('');
  const [pesoEntrada, setPesoEntrada] = useState(0);
  const [pesoSaida, setPesoSaida] = useState(0);
  const [pesoLiquido, setPesoLiquido] = useState(0);
  const [loteLeira, setLoteLeira] = useState('');
  const [umidade, setUmidade] = useState('');
  const [isSend, setIsSend] = useState(false);

  const {notificacoes, adicionarNotificacao} = useContext(AppContext);
  const navigate = useNavigate();

  const handlePesoEntradaChange = (value) => {
      setPesoEntrada(value);
      setPesoLiquido(Math.abs(value - pesoSaida).toFixed(2));
    };
  
  const handlePesoSaidaChange = (value) => {
    setPesoSaida(value);
    setPesoLiquido(Math.abs(pesoEntrada - value*1).toFixed(2));
  };
  
  // Envia os dados do ticket para a API
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSend(true);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Usuário não está autenticado');
      return;
    }
  
  const ticketData = {
    placa,
    produto,
    transportadora,
    motorista,
    operador,
    cliente,
    peso_entrada: pesoEntrada,
    peso_saida: pesoSaida,
    umidade: umidade,
    peso_liquido: pesoLiquido,
    lote_leira: loteLeira,
    ticket_cancelado: false,
    imagens: [],
    nf: [],
  };
  
  axios.post('http://127.0.0.1:8000/api/tickets/', ticketData, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      console.log('Ticket criado com sucesso:', response.data);
      toast.success('Ticket Criado com sucesso!');
      adicionarNotificacao(ticketData.titulo, ticketData.empresa);
      const newTicketId = response.data.id;
      console.log(newTicketId);
      navigate('/print/', {state: {ticketId:newTicketId} });
    })
    .catch(error => {
      if (error.response) {
        console.error('Erro ao criar o ticket:', error.response.data);
        toast.error('Erro ao criar o ticket!');
      } else {
        console.error('Erro ao criar o ticket:', error);
        toast.error('Erro ao criar o ticket!');
      }
    });
};


  return (
    <section
    className="space-y-4 p-6 bg-slate-950 rounded-md shadow">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
            <label className="text-white dark:text-gray-200" htmlFor="username">Placa</label>
            <input
                placeholder='Placa'
                type="text" maxLength={8}
                value={placa} onChange={(e) => setPlaca(e.target.value)}
                required 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            </div>

            <div>
            <label className="text-white dark:text-gray-200" >Produto</label>
            <input
                placeholder='Produto'
                type='text'
                value={produto} onChange={(e) => setProduto(e.target.value)}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            </div>

            <div>
            <label className="text-white dark:text-gray-200">Transportadora</label>
            <input
                placeholder='transportadora'
                className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={transportadora} onChange={(e) => setTransportadora(e.target.value)} 
                required
            />
            </div>
            <div >
                <label className="text-white dark:text-gray-200">Motorista</label>
                <input
                className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Motorista" type="text"
                value={motorista} onChange={(e) => setMotorista(e.target.value)} 
                required/>
            </div>
        <div >
        <label className="text-white dark:text-gray-200">Operador</label>
          <input
        className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="Operador" type="text"
          value={operador}
          onChange={(e) => setOperador(e.target.value)}
          required/>
        </div>
        <div >
    <label className="text-white dark:text-gray-200">Cliente</label>
        <input
            className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Cliente" type="text"
            value={cliente} onChange={(e) => setCliente(e.target.value)}
            required />
        </div>
        <div>
        <label className="text-white dark:text-gray-200">Peso Entrada</label>
          <input
            className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Peso Entrada" type="number"
            value={pesoEntrada} onChange={(e) => handlePesoEntradaChange(parseFloat(e.target.value))}
            required />
        </div>
        <div >
        <label className="text-white dark:text-gray-200">Peso Saída</label>
            <input
                className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Peso Saída" type="number"
                value={pesoSaida} onChange={(e) => handlePesoSaidaChange(parseFloat(e.target.value))}
                required/>
        </div>
        <div >
        <label className="text-white dark:text-gray-200">Peso Líquido</label>
          <input
          className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="Peso Líquido" type="text"
            value={pesoLiquido} readOnly={true} />
        </div>
        <div>
        <label className="text-white dark:text-gray-200">Umidade</label>
          <input
         className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="Umidade" type="text"
            value={umidade} onChange={(e) => setUmidade(e.target.value)} required={true} />
        </div>
        <div>
        <label className="text-white dark:text-gray-200">Lote (Identificação Leira)</label>
          <input
          className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="Lote Leira" type="text"
            value={loteLeira} onChange={(e) => setLoteLeira(e.target.value)} />
        </div>
        </div>
        <div className='p-2 text-center'>
            <button
            type='submit'
            disabled={isSend}
            className=
            'text-white font-bold text-center border rounded-md p-2 hover:bg-gray-200 hover:text-black'>
                {isSend ? "Gerando Ticket..." : "Criar Ticket"}
            </button>
        </div>
      </form>
    </section>
  );
};

export default FormTicket;
