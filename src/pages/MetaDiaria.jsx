import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import apiService from "../services/apiService";



const MetaDiaria = () =>{
  const [meta, setMeta] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const [novaMeta, setNovaMeta] = useState([]);

  const fetchMeta = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      const response = await apiService.insertMetas({meta, status});
      toast.success('Cadastrado com sucesso!');
      console.log('Retorno API:', response.data);
      setMeta('');
      setStatus('');
      fetchMetasResult(); // Atualiza a lista de metas após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar meta:', error);
      toast.error('Falha ao cadastrar Meta!');
    }
  };

  const fetchMetasResult = () => {
    apiService.getMetas()
      .then(response => {
        setNovaMeta(response.data.results);
      })
      .catch(error => console.error('Erro ao buscar Metas:', error));
  };

  // Chamada da função de busca de metas ao carregar o componente
  useEffect(() => {
    fetchMetasResult();
  }, []);

  return(
    <div className="flex justify-center mt-10 flex-col">
      <h2 className="mt-10 text-3xl flex justify-center text-white font-bold">Nova Meta Diária</h2>
      <form
      className="mt-10"
      onSubmit={fetchMeta}>
        <div className="mt-10">
        <input
        value={meta}
        onChange={(e)=>setMeta(e.target.value)}
        type="text"
        placeholder="00,00 Toneladas"
        className="border rounded-md border-slate-200 flex p-1 justify-self-center"
        />
        <input
        value={status}
        placeholder="Status"
        onChange={(e)=>setStatus(e.target.value)}
        className="border rounded-md border-slate-200 flex p-1 justify-self-center mt-2"
        type="text" />
        </div>
        <div className="mt-5">
          <button
          className="flex justify-self-center rounded-md bg-slate-900 text-white p-2 hover:bg-slate-600"
          type="submit">Registrar</button>
        </div>
      </form>
      <hr className=" mt-10" />
      <div className="border mt-5 rounded-md flex justify-center flex-col ml-4 mr-4">
        
        <h3 className="text-white font-bold text-3xl flex justify-center mt-5">Metas Cadastradas Recentemente</h3>

        <div className="relative overflow-x-auto shadow-md sm: rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Meta Diaria</th>
                  <th scope="col" className="px-6 py-3">Data Criação</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {novaMeta.map((metas)=>(
                <tr key={metas.id} classname="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" classname="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{metas.vlMeta}</th>
                  <td className="px-6 py-4">{metas.dtMeta}</td>
                  <td className="px-6 py-4">{metas.sttMeta}</td>
                </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default MetaDiaria;