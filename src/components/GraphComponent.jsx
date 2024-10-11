import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



  
const GraphComponent = (props) => {
    const data = [
      { name: 'Jan', Emitidos: 0, Concluídos: 0, amt: 2400 },
      { name: 'Fev', Emitidos: 120, Concluídos: 110, amt: 2400 },
      { name: 'Mar', Emitidos: 600, Concluídos: 500, amt: 2400 },
      { name: 'Abr', Emitidos: 324, Concluídos: 240, amt: 2400 },
      { name: 'Mai', Emitidos: 2400, Concluídos: 1400, amt: 2400 },
      { name: 'Jun', Emitidos: 100, Concluídos: 400, amt: 2400 },
      { name: 'Jul', Emitidos: 1400, Concluídos: 400, amt: 2400 },
      { name: 'Ago', Emitidos: 100, Concluídos: 400, amt: 2400 },
      { name: 'Set', Emitidos: 17, Concluídos: 15, amt: 2400 },
      { name: 'Out', Emitidos: 100, Concluídos: 400, amt: 2400 },
      { name: 'Nov', Emitidos: 400, Concluídos: 400, amt: 2400 },
      { name: 'Dez', Emitidos: 150, Concluídos: 50, amt: 2400 },
    ];

    return (
      <ResponsiveContainer width="50%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Emitidos" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Concluídos" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  };
  
  export default GraphComponent;
  