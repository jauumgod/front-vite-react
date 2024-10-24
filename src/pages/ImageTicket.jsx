import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";




const ImageTicket =() =>{

    const [imageData, setImageData] = useState(null);
    const location = useLocation();
    const { ticketId } = location.state || {}; 

    console.log(ticketId);

    useEffect(()=>{
        if(ticketId){
            apiService.getImage(ticketId)
            .then(response=>{
                setImageData(response);
                console.log(response);
            })
            .catch(
                error=> console.error('Erro ao buscar imagem: ', error));
                toast.error('Erro ao buscar imagem.');
        }
    }, [ticketId]);

    return (
        <div>
          {imageData ? (
            <div className="text-center text-white">
              <h2>Assinatura do Ticket</h2>
              <div className="flex justify-center mt-4">
                <img src={imageData.imagem} alt="Ticket Image" style={{ maxWidth: '100%' }} />
              </div>
            </div>
          ) : (
            <div>
                <h2 
                className="text-white text-center mt-4">
                    Falha ao carregar imagem, falar com administrador.
                </h2>
            </div>
          )}
        </div>
      );
}

export default ImageTicket;