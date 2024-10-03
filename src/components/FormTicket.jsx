import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent'

const FormTicket =() =>{
    const sequencia = 100;
    return(
        <div className=" space-y-4 p-6 bg-slate-400 rounded-md shadow flex flex-col">
            <p className='font-bold text-2xl'>Ticket: {sequencia}</p>
            <InputComponent placeholder="Placa" type="text"/>
            <InputComponent placeholder="Produto" type="text"/>
            <InputComponent placeholder="Transportadora" type="text"/>
            <InputComponent placeholder="Motorista" type="text"/>
            <InputComponent placeholder="Operador" type="text"/>
            <InputComponent placeholder="Cliente" type="text"/>
            <InputComponent placeholder="Peso Entrada" type="text"/>
            <InputComponent placeholder="Peso Saída" type="text"/>
            <InputComponent placeholder="Peso Liquido" type="text" readOnly={true}/>
            <InputComponent placeholder="Umidade" type="text" />
            <InputComponent placeholder="Lote Leira" type="text" />
            <ButtonComponent nameButton = "Criar Ticket"/>
        </div>
    )
}

export default FormTicket; 