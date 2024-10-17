import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import apiService from '../services/apiService';


const TableEmpresas = () => {
  const [empresas, setEmpresas] = useState([]); // Estado para armazenar os usuários
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

const fetchEmpresas = async (page = 1) =>{
  setLoading(true);
  try{
    const response = await apiService.getEmpresas(page,limit);
    setEmpresas(response.data.results || response.data);
    setTotalPages(Math.ceil(response.data.count / limit));
  } catch(error){
    console.error("Erro ao buscar empresas: ", error);
  } finally{
    setLoading(false);
  }
};
-
useEffect(()=>{
  fetchEmpresas(currentPage);
}, [currentPage]);


  return (
    <div className="space-y-4 p-6 bg-slate-600 rounded-md shadow flex flex-col text-white">
      <div>
        <Link to="/empresa">
          <button className="bg-blue-800 rounded-md hover:bg-blue-900 py-2 px-2 font-bold">
            Nova empresa
          </button>
        </Link>
      </div>
      
      {loading ? (
        <div className="text-center text-white">Carregando...</div>
      ) : (
        <table className="border-separate border border-slate-500 py-3">
          <thead>
            <tr>
            <th className="border border-slate-800 bg-slate-800">id</th>
              <th className="border border-slate-800 bg-slate-800">Empresa</th>
              <th className="border border-slate-800 bg-slate-800">CNPJ</th>
              <th className="border border-slate-800 bg-slate-800">Endereço</th>
              <th className="border border-slate-800 bg-slate-800">Opções</th>
            </tr>
          </thead>
          <tbody>
            {empresas.length > 0 ? (
              empresas.map((empresa) => (
                <tr key={empresa.id}>
                  <td className="border text-center border-slate-700 hover:bg-slate-500">
                    {empresa.id}
                  </td>
                  <td className="border text-center border-slate-700 hover:bg-slate-500">
                    {empresa.nome}
                  </td>
                  <td className="border text-center border-slate-700 hover:bg-slate-500">
                    {empresa.cnpj}
                  </td>
                  <td className="border text-center border-slate-700 hover:bg-slate-500">
                    {empresa.endereco}
                  </td>
                  <td className="border text-center border-slate-700">
                    <Link to={`/editar_usuario/${empresa.id}`}>
                      <ButtonComponent nameButton="Editar" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center border border-slate-700">
                  Nenhuma empresa encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      
      <div className="flex p-2 px-5 py-2 text-center justify-end">
        <div className="p-2">
          <ButtonComponent nameButton="Início" />
        </div>
        <div className="p-2">
          <ButtonComponent nameButton="1" />
        </div>
        <div className="p-2">
          <ButtonComponent nameButton="2" />
        </div>
        <div className="p-2">
          <ButtonComponent nameButton="3" />
        </div>
        <div className="p-2">
          <ButtonComponent nameButton="Fim" />
        </div>
      </div>
    </div>
  );
};

export default TableEmpresas;
