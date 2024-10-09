import React, {useContext,  useState, useEffect} from 'react';
import withAuth from '../utils/withAuth';
import apiService from '../services/apiService';
import {AppContext} from "../context/AppContext";
import ComponentList from '../components/ComponentList';
import GraphComponent from '../components/GraphComponent';


const HomePage = () => {

  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const {isLoading, setIsLoading }= useContext(AppContext);

  
  const fetchTickets = () => {
    setIsLoading(true);

    apiService
      .getTickets(tickets, totalTickets)
      .then((response) => {
        setTickets(response.data.results);
        setTotalTickets(response.data.count);
        setIsLoading(false); // Atualiza para false após carregar os dados
      })
      .catch((error) => {
        console.error('Erro ao buscar os tickets:', error);
        setIsLoading(false); // Atualiza para false mesmo em caso de erro
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  console.log("Estado atual: ", isLoading)
  console.log(tickets)

  return (
    <div className="min-h-screen w-full bg-slate-800 flex flex-col py-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-12 h-12 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <span className="ml-2">Carregando tickets...</span>
        </div>
      ) : (
    <div>
      <div className='flex space-x-4 justify-center mt-6'>
          <ComponentList title={"Tickets Emitidos"} total={totalTickets}/>

          <ComponentList title={"Tickets Concluídos"} total={15}/>

          <ComponentList title={"Pendentes"} total={2}/>
      </div>
      <div className='flex space-x-4 justify-center mt-6'>
        <GraphComponent/>
      </div>
 

 

    </div>
      )}
    </div>
  );
};

export default withAuth (HomePage);
