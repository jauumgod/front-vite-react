import { useEffect, useState } from "react";
import { Radar } from '@ant-design/charts';
import apiService from "../services/apiService";

const RadarChart = () => {
    const [data, setData] = useState([]);  // Inicia o estado com um array vazio

    useEffect(() => {
        // Função para buscar os dados da API
        const fetchStats = async () => {
            try {
                const response = await apiService.getStats();
                const stats = response.data.monthly_stats || []; // Ajuste conforme necessário

                // Formatação dos dados para o gráfico radar
                const formattedData = stats.map(item => ({
                    year: item.empresa__nome,  // Ajuste o campo conforme necessário
                    value: item.emitidos || 0,  // Ajuste o campo conforme necessário
                }));

                setData(formattedData);  // Atualiza o estado com os dados formatados
            } catch (error) {
                console.error("Erro ao buscar dados de estatísticas:", error);
            }
        };

        fetchStats();  // Chama a função para buscar os dados
    }, []);

    // Props para o RadarChart
    const props = {
        data,  // Passa os dados recebidos da API
        xField: 'year',  // O eixo X representará o nome da empresa
        yField: 'value',  // O eixo Y representará os valores emitidos
        meta: {
            year: { alias: 'Empresa' },  // Define o alias para o eixo X
            value: { alias: 'Emitidos' },  // Define o alias para o eixo Y
        },
    };

    return (
        <div className="border mt-2 rounded-md bg-slate-600 text-white">
            <span className="flex justify-center text-2xl">Operação x Produto</span>
            <Radar {...props} />  {/* Renderiza o gráfico Radar com as props */}
        </div>
    );
}

export default RadarChart;
