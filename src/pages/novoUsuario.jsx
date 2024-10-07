import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';


const novoUsuario = () =>{
    return (
        <div>
            <h2>Criar Novo Usuário</h2>
            <div>
                <InputComponent type={"text"}/>
                <InputComponent type={"text"}/>
                <ButtonComponent nameButton="Criar Usuário"/>
            </div>
        </div>
    )
}

export default novoUsuario;