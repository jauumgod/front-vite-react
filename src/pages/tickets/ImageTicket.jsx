import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

const ImageTicket = () => {
    const [imageData, setImageData] = useState(null);
    const location = useLocation();
    const { ticketId } = location.state || {}; 
    const navigate = useNavigate();

    useEffect(() => {
        if (ticketId) {
            apiService.getImage(ticketId)
                .then(response => {
                    // A resposta é um array, pegamos o primeiro item
                    if (response.length > 0) {
                        setImageData(response[0]); // Armazena a primeira imagem
                    } else {
                        toast.error('Nenhuma imagem encontrada para este ticket.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar imagem: ', error);
                    toast.error('Erro ao buscar imagem.'); // Exibe toast apenas em caso de erro
                });
        }
    }, [ticketId]);

    return (
        <div >
            <div className='flex-row space-x-1'>
                <button onClick={()=> navigate(-1)} className="bg-slate-300 text-center text-slate-900 border rounded-md mt-2 ml-2 flex">
                <ChevronLeftIcon/> Voltar
                </button>
            </div>
            {imageData ? (
                <div className="text-center text-white">
                    <h2>Assinatura do Ticket</h2>
                    <div className="flex justify-center mt-4">
                        <img src={imageData.imagem_url} alt="Ticket Image" style={{ maxWidth: '100%' }} />
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-white text-center mt-4">
                        Falha ao carregar imagem, falar com administrador.
                    </h2>
                </div>
            )}
        </div>
    );
}

export default ImageTicket;
