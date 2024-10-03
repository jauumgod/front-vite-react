import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";


const TableUser = () =>{
    return(
        <div className="space-y-4 p-6 bg-slate-600 rounded-md shadow flex flex-col text-white">
            <table className="border-separate border border-slate-500 py-3">
                <thead>
                    <tr>
                        <th className="border border-slate-800 bg-slate-800">Nome</th>
                        <th className="border border-slate-800 bg-slate-800">Empresa</th>
                        <th className="border border-slate-800 bg-slate-800">Nova Senha</th>
                        <th className="border border-slate-800 bg-slate-800">Desativar</th>
                        <th className="border border-slate-800 bg-slate-800">Salvar</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-700 hover:bg-slate-500">BRK-7TYS</td>
                        <td className="border border-slate-700 hover:bg-slate-500">ORGANICS JK</td>
                        <td className="border border-slate-700 hover:bg-slate-500 text-black" ><InputComponent/></td>
                        <td className=" border-slate-700"><ButtonComponent color="bg-red" nameButton = "Desativar"/></td>
                        <td className=" border-slate-700"><ButtonComponent color="bg-slate-800" nameButton = "Salvar"/></td>
                    </tr>
                </tbody>
            </table>
            <div className="flex p-2 px-5 py-2 text-center justify-end">
                <div className="p-2">
                <ButtonComponent nameButton = "Inicio"/>
                </div>
                <div className="p-2">
                <ButtonComponent nameButton = "1"/>
                </div>
                <div className="p-2">
                <ButtonComponent nameButton = "2"/>
                </div>
                <div className="p-2">
                <ButtonComponent nameButton = "3"/>
                </div>
                
                <div className="p-2">
                <ButtonComponent nameButton = "Fim"/>
                </div>
            </div>
        </div>
    )
}

export default TableUser;