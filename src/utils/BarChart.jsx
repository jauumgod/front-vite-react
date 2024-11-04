import { useState, useEffect } from "react";
import { Bar } from '@ant-design/charts';
import apiService from "../services/apiService"; // ajuste para o seu caminho do serviço API

const BarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Função para buscar os dados da API
        const fetchStats = async () => {
            try {
                const response = await apiService.getStats();
                const stats = response.data.monthly_stats || []; // Substitua pelo campo adequado se não for 'monthly_stats'
                
                // Mapeia os dados para obter "empresa" e "emitidos" e garantir que emitidos seja pelo menos 0
                const formattedData = stats.map(item => ({
                    empresa: item.empresa__nome,
                    emitidos: item.emitidos || 0,
                }));

                setData(formattedData);
            } catch (error) {
                console.error("Erro ao buscar dados de estatísticas:", error);
            }
        };

        fetchStats();
    }, []);

    // Configuração do gráfico
    const config = {
        data,
        xField: 'empresa',    // campo para o nome da empresa
        yField: 'emitidos',    // campo para o número de tickets emitidos
        seriesField: 'empresa', // permite diferenciar cada empresa no gráfico
        color: '#4096ff',      // Ajuste a cor conforme desejado
        xAxis: { title: { text: 'Empresa' } },
        yAxis: { title: { text: 'Tickets Emitidos' }, min: 0 },
    };

    return (
        <div className="border mt-2 rounded-md bg-slate-600">
            <span className="flex justify-center text-2xl text-white">Empresa x Tickets Emitidos</span>
            <Bar {...config} />
        </div>
    );
}

export default BarChart;
