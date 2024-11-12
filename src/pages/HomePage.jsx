import React, {useContext,  useState, useEffect} from 'react';
import withAuth from '../utils/withAuth';
import apiService from '../services/apiService';
import {AppContext, useAppContext} from "../context/AppContext";
import ComponentList from '../components/ComponentList';
import GraphComponent from '../utils/GraphComponent';
import { toast } from 'sonner';
import PieChart from '../utils/PieChart';





const HomePage = () => {
  const [totalTickets, setTotalTickets] = useState(0);
  const {isLoading, setIsLoading }= useContext(AppContext);
  const [grupoUserId, setGrupoUserId] = useState(null);

  const {totalConcluidos, setTotalConcluidos } = useAppContext();
  const [tempoMedio, setTempoMedio] = useState('');

  const fetchTickets = () => {
    setIsLoading(true);
    apiService
      .getTickets(totalTickets)
      .then((response) => {
        setTotalTickets(response.data.count);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error('Erro ao buscar os tickets:', error);
        setIsLoading(false);
      });
  };

  const valorPendente = Math.abs(totalConcluidos - totalTickets);

  

  useEffect(() => {
    fetchTickets();
    const storedUserId = localStorage.getItem('grupo');
    setGrupoUserId(parseInt(storedUserId));
    
  }, []);

  useEffect(()=>{
    const fetchStats = async () =>{
      try{
        const response = await apiService.getStats();
        const {monthly_stats} = response.data;
        const total = monthly_stats.reduce((acc, curr) => acc + curr.concluidos, 0);
        setTotalConcluidos(total);
      }catch(error){
        console.error("Erro ao buscar Stats: ", error)
        toast.error("Erro ao buscar Stats");
      }
    };
    fetchStats();
  }, [setTotalConcluidos]);



  
  return (
    <div className="min-h-screen w-full bg-slate-800 flex flex-col py-4 mt-5">
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-12 h-12 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <span className="ml-2">Carregando tickets...</span>
        </div>
      ) : (
    <div>
      <div className='flex space-x-14 justify-center mt-2 mb-4'>

        {grupoUserId === 1 ||grupoUserId=== 2 ? (
          <>

            <ComponentList route = "/tickets" title={"Tickets Emitidos"} total={totalTickets}/>
            <ComponentList title={"Tickets Concluídos"} total={totalConcluidos}/>
            <ComponentList title={"Pendentes"} total={valorPendente}/>
          </>
          ):(
          <>
            <ComponentList route = "/mytickets" title={"Tickets Emitidos"} total={totalTickets}/>
            <ComponentList title={"Tickets Concluídos"} total={totalConcluidos}/>
            <ComponentList title={"Pendentes"} total={valorPendente}/>
          </>
          )}
        
        
      </div>
        <div className='m-10'><GraphComponent/></div>
    </div>
      )}
    </div>
  );
};

export default withAuth (HomePage);
