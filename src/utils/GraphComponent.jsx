import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import apiService from '../services/apiService';

const GraphComponent = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [viewType, setViewType] = useState('monthly'); // Alterna entre 'monthly' e 'daily'

  const fetchDados = async () => {
    try {
      const response = await apiService.getStats(); // Aguarda a resposta da API
      const { monthly_stats, daily_stats } = response.data;

      // Processando os dados mensais
      const processedMonthlyData = monthly_stats.map((dado) => ({
        month: new Date(dado.month).toLocaleString('pt-BR', { month: 'long' }), // Formata o mês
        Emitidos: dado.emitidos,
        Concluídos: dado.concluidos,
      }));

      // Processando os dados diários
      const processedDailyData = daily_stats.map((dado) => ({
        day: dado.day,
        Emitidos: dado.emitidos,
        Concluídos: dado.concluidos,
      }));

      setMonthlyData(processedMonthlyData);
      setDailyData(processedDailyData);
    } catch (error) {
      console.error('Erro ao buscar Stats: ', error);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  // Escolhe qual dado exibir com base no estado 'viewType'
  const dataToDisplay = viewType === 'monthly' ? monthlyData : dailyData;

  return (
    <div>
      
      <div className="flex justify-center mb-4 mt-2">
        <button
          onClick={() => setViewType('monthly')}
          className={`px-4 py-2 rounded-md  ${viewType === 'monthly' ? 'bg-blue-700' : 'bg-blue-500'} text-white mr-2`}
        >
          Ver Mensal
        </button>
        <button
          onClick={() => setViewType('daily')}
          className={`px-4 py-2 rounded-md ${viewType === 'daily' ? 'bg-green-700' : 'bg-green-500'} text-white`}
        >
          Ver Diário
        </button>
      </div>

    <div className="border mt-2 rounded-md bg-slate-700 text-white">
     <h3 className='flex justify-center text-3xl text-bold mt-2 mb-2'>Emitidos x Concluídos</h3>
      <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dataToDisplay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={viewType === 'monthly' ? 'month' : 'day'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Emitidos" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Concluídos" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
    </div>
    </div>
  );
};

export default GraphComponent;
