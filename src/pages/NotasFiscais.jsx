import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { Download } from "lucide-react";

const NotasFiscais = () => {
    const [notafiscal, setNotaFiscal] = useState(null);
    const location = useLocation();
    const { ticketId } = location.state || {}; 

    useEffect(() => {
        if (ticketId) {
            apiService.getNotaFiscal(ticketId)
                .then(response => {
                    setNotaFiscal(response);
                    console.log(response);
                })
                .catch(error => {
                    console.error('Erro ao buscar nf: ', error);
                    toast.error('Erro ao buscar nf.');
                });
        }
    }, [ticketId]);

    const handleDownload = () => {
        if (notafiscal && notafiscal.arquivo) {
            window.open(notafiscal.pdf_url, '_blank');
        }
    };

    return (
        <div>
            {notafiscal ? (
                <div className="text-center text-white">
                    <div className="flex justify-center mt-4">
                        {notafiscal.nfe}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button 
                            onClick={handleDownload} 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 flex justify-center flex-row"
                        >
                            Baixar PDF
                            <Download />
                        </button>
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

export default NotasFiscais;

