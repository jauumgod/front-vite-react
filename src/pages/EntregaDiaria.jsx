import { useEffect, useState } from "react";
import apiService from "../services/apiService";


const EntregaDiaria = () =>{
    const [cliente, setCliente] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [produtoSelected, setProdutoSelected] = useState('');
    const [transportadora, setTransportadora] = useState('');


    const fetchProdutos = () =>{
      const response = apiService.getProdutos();
      setProdutos(response.data.results);
    };

    useEffect(()=>{
      fetchProdutos();
    }, []);

    return(
        <section
        className="space-y-4 p-6 bg-slate-950 rounded-md shadow">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                <label className="text-white dark:text-gray-200" htmlFor="username">Placa</label>
                <input
                    placeholder='Placa'
                    type="text" maxLength={8}
                    value={placa} onChange={(e) => setPlaca(e.target.value)}
                    required 
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                </div>
    
                <div>
          <label className="text-white dark:text-gray-200">Produto</label>
          <select
            value={produtoSelected}
            onChange={(e) => setProdutoSelected(e.target.value)}
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option value="" disabled>Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>
    
            <div>
            <label className="text-white dark:text-gray-200">Transportadora</label>
            <input
                placeholder='transportadora'
                className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={transportadora} onChange={(e) => setTransportadora(e.target.value)} 
                required
            />
            </div>
                <div >
                    <label className="text-white dark:text-gray-200">Cliente</label>
                    <input
                    className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    placeholder="Motorista" type="text"
                    value={cliente} onChange={(e) => setCliente(e.target.value)} 
                    required/>
                </div>
            <div >
            <label className="text-white dark:text-gray-200">Peso Líquido</label>
              <input
              className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Peso Líquido" type="text"
                value={pesoLiquido} readOnly={true} />
            </div>
            </div>
            <div className='p-2 text-center'>
                <button
                type='submit'
                disabled={isSend}
                className=
                'text-white font-bold text-center border rounded-md p-2 hover:bg-gray-200 hover:text-black'>
                    {isSend ? "Gerando Ticket..." : "Criar Ticket"}
                </button>
            </div>
          </form>
        </section>
    )
}

export default EntregaDiaria;