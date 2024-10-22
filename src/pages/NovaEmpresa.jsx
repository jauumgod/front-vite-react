import { useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";


const NovaEmpresa = () =>{

    const [empresa, setEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');

    const navigate = useNavigate();

    const fetchEmpresa = async () =>{
        try{
            const response = await userService.createEmpresa(
                empresa,
                cnpj,
                endereco,
                cidade,
                );
                console.log(response);
                toast.success('Empresa criada com sucesso!');
                navigate('/config');
        }catch(error){
            console.error('Erro ao criar empresa: ',error);
            toast.error(error.response?.data?.error || 'Erro ao criar empresa');
        }
    }

    useEffect(()=>{
        fetchEmpresa();
    }, []);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        return;
    }

    return (
        <div className="min-h-screen w-full bg-slate-800 flex justify-center">    
            <div className="w-[450px] space-y-4 pt-2 mt-4">
            <h2 className="text-center text-white text-3xl">Cadastrar Nova Empresa</h2>
                <form onSubmit={handleSubmit}>
                    <div className="p-2">
                        <InputComponent
                        required={true}
                        value={empresa}
                        onChange={(e)=> setEmpresa(e.target.value)}
                        placeholder={"Digite nome da empresa"}
                        />
                    </div>
                    <div className="p-2">
                        <InputComponent
                        required={true}
                        value={cnpj}
                        onChange={(e)=> setCnpj(e.target.value)}                     
                        placeholder={"Digite o CNPJ"}/>
                    </div>
                    <div className="p-2">
                        <InputComponent
                        required={true}
                        value={endereco}
                        onChange={(e)=> setEndereco(e.target.value)}                         
                        placeholder={"Digite o endereço"}/>
                    </div>
                    <div className="p-2">
                        <InputComponent
                        required={true}
                        value={cidade}
                        onChange={(e)=> setCidade(e.target.value)}                         
                        placeholder={"Digite a cidade"}/>
                    </div>
                    <div className="p-2 text-center">
                        <ButtonComponent nameButton={"Criar Novo"}/>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default NovaEmpresa;