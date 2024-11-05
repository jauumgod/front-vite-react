import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import apiService from "../services/apiService"; // ajuste para o seu caminho do serviço API

const BarChart = () => {
    const chartRef = useRef(null); // Referência para o contêiner do gráfico

    useEffect(() => {
        // Função para buscar os dados da API
        const fetchStats = async () => {
            try {
                const response = await apiService.getStats();
                const stats = response.data.monthly_stats || []; // Ajuste conforme necessário

                // Formatação dos dados
                const formattedData = stats.map((item, index) => ({
                    pos: index + 1, // posição fictícia
                    no: item.no || 0, // Ajuste conforme necessário
                    driver: item.empresa__nome, // ou outro campo que você precisa
                    car: item.carro || 'Desconhecido', // Ajuste conforme necessário
                    laps: item.laps || 0, // Ajuste conforme necessário
                    time: item.time || 'N/A', // Ajuste conforme necessário
                    pts: item.emitidos || 0, // Ajuste conforme necessário
                }));

                renderChart(formattedData); // Renderiza o gráfico com os dados
            } catch (error) {
                console.error("Erro ao buscar dados de estatísticas:", error);
            }
        };

        fetchStats();
    }, []);

    const renderChart = (data) => {
        const chart = new Chart({
            container: chartRef.current,
            autoFit: true,
        });

        chart.data(data);

        function medal(ranking) {
            if (ranking > 2) return `第${ranking + 1}名`;
            const { document } = chart.getContext().canvas;
            const group = document.createElement('g', {});
            const size = ranking === 0 ? 20 : 15;
            const icon = document.createElement('image', {
                style: {
                    src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1NiMRKb2sfMAAAAAAAAAAAAADmJ7AQ/original',
                    width: size,
                    height: size,
                    transform: `translate(-${size / 2}, -${size / 2})`,
                },
            });
            const text = ['1 Place🏆', '2 Place🥈 ', '3 Place🥉'][ranking];
            const label = document.createElement('text', {
                style: {
                    text,
                    fill: 'white',
                    textAlign: 'center',
                    transform: `translate(0, 35)`,
                },
            });

            group.appendChild(icon);
            group.appendChild(label);
            return group;
        }

        chart
            .interval()
            .encode('x', 'pos')
            .encode('y', 'pts')
            .encode('color', 'pts')
            .axis({
                x: {
                    title: 'Top Ranking Empresas',
                    size: 80,
                    labelFormatter: (datum, index) => medal(index),
                },
                y: false,
            })
            .label({
                text: 'driver',
                transform: [{ type: 'contrastReverse' }],
            })
            .label({
                text: 'time',
                fill: 'white',
                transform: [{ type: 'contrastReverse' }],
                dy: 20,
                fontStyle: 'italic',
            })
            .tooltip({ title: 'car' })
            .legend(false);

        chart.render();
    };

    return (
        <div >
            
        </div>
    );
};

export default BarChart;
