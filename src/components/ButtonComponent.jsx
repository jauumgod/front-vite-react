

const ButtonComponent = (props) =>{
    return(
        <button type={props.type} onClick={props.onClick} className="bg-slate-500 text-white px-4 py-2 rounded-md font-bold hover:bg-slate-900">{props.nameButton}</button>
    )
}

export default ButtonComponent;