import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import getEmpresas from '../services/apiService';

const TableEmpresas = () => {
  const [empresas, setEmpresas] = useState([]); // Estado para armazenar os usuários
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    // Função para buscar todos os usuários da API
    const fetchUsers = async () => {
      try {
        const response = getEmpresas(); // Chama a função getUsers do apiService
        setEmpresas(response.data); // Define os usuários no estado
        setLoading(false); // Indica que terminou o carregamento
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        setLoading(false);
      }
    };

    fetchUsers(); // Executa a busca ao montar o componente
  }, []);

  return (
    <div className="space-y-4 p-6 bg-slate-600 rounded-md shadow flex flex-col text-white">
      <div>
        <Link to="/novo_usuario">
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
                    {empresa.nome}
                  </td>
                  <td className="border text-center border-slate-700 hover:bg-slate-500">
                    {empresa.cnpj}
                  </td>
                  <td className="border text-center border-slate-700 hover:bg-slate-500">
                    {empresa.endereço}
                  </td>
                  <td className="border text-center border-slate-700">
                    <Link to={`/editar_usuario/${user.id}`}>
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
