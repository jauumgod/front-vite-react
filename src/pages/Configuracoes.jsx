import TableUser from "../components/TableUsers";


const Configuracoes=()=>{
    return(
    <div className=" min-h-screen w-full bg-slate-800 flex justify-center">
        <div className=' space-y-4'>
        <h2 className=" text-slate-100 font-bold text-center text-3xl">Configurações</h2>
            <TableUser/>
        </div> 
    </div>
    )
}

export default Configuracoes;