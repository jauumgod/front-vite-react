import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiService from "../services/apiService";
import { toast } from "sonner";

const NotasFiscais = () => {
    const [ticket, setTicket] = useState(null);
    const [fileInput, setFileInput] = useState(null);
    const location = useLocation();
    const { ticketId } = location.state || {};

    const fetchTicket = () => {
        apiService.getTicketById(ticketId)
            .then(response => {
                setTicket(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar Ticket: ', error);
                toast.error('Erro ao buscar Ticket.');
            });
    };

    const handleFileChange = (e) => {
        setFileInput(e.target.files[0]); // Armazenar o arquivo selecionado
    };

    const handleUpload = async () => {
        if (!fileInput) {
            toast.error('Por favor, selecione um arquivo para fazer o upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', fileInput);
        formData.append('ticket', ticketId); // Inclua o ID do ticket se necessário

        try {
            await apiService.uploadImage(formData);
            toast.success('Imagem salva com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar imagem: ', error);
            toast.error('Erro ao salvar imagem.');
        }
    };

    useEffect(() => {
        fetchTicket();
    }, []);

    return (
        <div className="w-full flex justify-center mt-20 text-white">
            <div className="bg-gray-600 shadow-md rounded-md border px-8 pt-6 pb-8 mb-4">
                {ticket && (
                    <>
                        <div >
                            <span className="justify-center flex mt-2">Ticket: {ticket.sequencia}</span>
                        </div>
                        <div className="mt-2">
                            <span >Empresa: {ticket.empresa.nome}</span>
                        </div>
                        <div className="mt-2">
                            <input
                                className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                            className="border rounded-md text-white bg-gray-900 p-2 mt-4 hover:bg-gray-800"
                            onClick={handleUpload}>Salvar</button>
                        </div>
                                </>
                            )}
                        </div>


        </div>
    );
}

export default NotasFiscais;
