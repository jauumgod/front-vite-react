import { Pie } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import apiService from "../services/apiService"; // ajuste para o caminho do serviço API

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchStats = async () => {
      try {
        const response = await apiService.getStats();
        const stats = response.data.monthly_stats || []; // Substitua pelo campo adequado se não for 'monthly_stats'

        // Mapeia os dados para obter "produto" e "quantidade_retirada"
        const formattedData = stats.map(item => ({
          type: item.produto__nome,
          value: item.quantidade_retirada || 0,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados de estatísticas:", error);
      }
    };

    fetchStats();
  }, []);

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      type: 'outer',
      content: '{name} ({percentage})',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      position: 'right',
    },
  };

  return (
    <div className='border bg-slate-600 rounded-md mt-2'>
      <span className='flex justify-center text-3xl text-white'>Produtos x Quantidade Retirada</span>
      <Pie {...config} />
    </div>
  );
};

export default PieChart;
