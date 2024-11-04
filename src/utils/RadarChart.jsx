import { useState } from "react";
import { Radar } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';



const RadarChart = () =>{
    const [datas, setData] = useState('');
    const data = [
        { year: 'JK', value: 4.5 },
        { year: 'Organics', value: 4 },
        { year: 'FertSoy', value: 5 },
        { year: 'Fertijam', value: 5 },
        { year: 'Milho', value: 4.9 },
        { year: 'Adubo', value: 6 },
      ];
    const props = {
        data,
        xField: 'year',
        yField: 'value',
    };

    return(
        <div className="border mt-2 rounded-md bg-slate-300">
            <span className="flex justify-center text-2xl">Operação x Produto</span>
            <Radar {...props} />
        </div>
    );
}


export default RadarChart;