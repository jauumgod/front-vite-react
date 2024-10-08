import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";



const NovaEmpresa = () =>{
    return (
        <div className="min-h-screen w-full bg-slate-800 flex justify-center">    
            <div className="w-[450px] space-y-4 pt-2 mt-4">
            <h2 className="text-center text-white text-3xl">Cadastrar Nova Empresa</h2>
                <form action="">
                    <div className="p-2">
                        <InputComponent placeholder={"Digite nome da empresa"}/>
                    </div>
                    <div className="p-2">
                        <InputComponent placeholder={"Digite o CNPJ"}/>
                    </div>
                    <div className="p-2">
                        <InputComponent placeholder={"Digite o endereço"}/>
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