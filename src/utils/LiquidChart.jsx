import { Liquid } from '@ant-design/plots';
import React from 'react';


const LiquidChart = () => {
  const config = {
    percent: 0.3,
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };
  return (
    <div className='border rounded-md bg-slate-600 mt-2'>
      <span className='flex justify-center text-3xl text-white '>Planejado x Entregue</span>
      <Liquid {...config} />
    </div>
  );
};

export default LiquidChart;
