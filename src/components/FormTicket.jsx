import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent'
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'sonner';


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
  const [successMessage, setSuccessMessage] = useState('');

  const {setTicketCriado} = useContext(AppContext);
  
  
  const handlePesoEntradaChange = (value) => {
    setPesoEntrada(value);
    setPesoLiquido(value - pesoSaida);
  };

  const handlePesoSaidaChange = (value) => {
    setPesoSaida(value);
    setPesoLiquido(pesoEntrada - value*1);
  };

  // Envia os dados do ticket para a API
  const handleSubmit = (e) => {
    e.preventDefault();

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
      peso_liquido: pesoLiquido,
      lote_leira: loteLeira,
      umidade: umidade,
      ticket_cancelado: false,
    };

    axios.post('http://127.0.0.1:8000/api/tickets/', ticketData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        console.log('Ticket criado com sucesso:', response.data);
        setSuccessMessage('Ticket criado com sucesso!');
        toast.success('Ticket Criado com sucesso!');
        FormTicket('');
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
    <div className="space-y-4 p-6 bg-slate-700 rounded-md shadow flex flex-col">
      
      <form onSubmit={handleSubmit}>
        <div className='p-2'>
          <InputComponent placeholder="Placa" type="text" maxLength={8}
            value={placa} onChange={(e) => setPlaca(e.target.value)} required={true} />
        </div>
        <div className='p-2'>
          <InputComponent placeholder="Produto" type="text"
            value={produto} onChange={(e) => setProduto(e.target.value)} required={true} />
        </div>
        <div className="p-2">
          <InputComponent placeholder="Transportadora" type="text"
            value={transportadora} onChange={(e) => setTransportadora(e.target.value)} required={true} />
        </div>
        <div className="p-2">
          <InputComponent placeholder="Motorista" type="text"
            value={motorista} onChange={(e) => setMotorista(e.target.value)} required={true} />
        </div>
        <div className="p-2">
          <InputComponent placeholder="Operador" type="text"
            value={operador} onChange={(e) => setOperador(e.target.value)} required={true} />
        </div>
        <div className="p-2">
          <InputComponent placeholder="Cliente" type="text"
            value={cliente} onChange={(e) => setCliente(e.target.value)} required={true} />
        </div>
        <div className="p-2">
          <InputComponent placeholder="Peso Entrada" type="number"
            value={pesoEntrada} onChange={(e) => handlePesoEntradaChange(parseFloat(e.target.value))} required={true} />
        </div>
        <div className="p-2">
          <InputComponent placeholder="Peso Saída" type="number"
            value={pesoSaida} onChange={(e) => handlePesoSaidaChange(parseFloat(e.target.value))} />
        </div>
        <div className="p-2">
          <InputComponent placeholder="Peso Líquido" type="text"
            value={pesoLiquido} readOnly={true} />
        </div>
        <div className="p-2">
          <InputComponent placeholder="Umidade" type="text"
            value={umidade} onChange={(e) => setUmidade(e.target.value)} required={true} />
        </div>
        <div className="p-2">
          <InputComponent placeholder="Lote Leira" type="text"
            value={loteLeira} onChange={(e) => setLoteLeira(e.target.value)} />
        </div>
        <div className='p-2 text-center'>
          <ButtonComponent nameButton="Criar Ticket" type="submit" />
        </div>
        
      </form>
    </div>
  );
}

export default FormTicket;
