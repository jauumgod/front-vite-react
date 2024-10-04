import { useState,useEffect } from 'react';
import CardComponent from '../components/CardComponent'
import apiService from '../services/apiService'


const HomePage =() =>{
    const [tickets, setTickets] = useState([]);
    const [totalTickets, setTotalTickets] = useState(0);


    const fetchTickets = () => {
        apiService.getTickets(tickets,totalTickets)
          .then(response => {
            setTickets(response.data.results);
            setTotalTickets(response.data.count);
          })
          .catch(error => console.error('Erro ao buscar os tickets:', error));
      };
      useEffect(() => {
        fetchTickets();
    }, []);

    return(
        <div className="  min-h-screen w-full bg-slate-800 flex flex-col py-4">
            <CardComponent tickets={tickets} totalTickets={totalTickets}/>  
        </div>
    )
}

export default HomePage;