import { useState } from "react";
import TableUser from "../components/TableUsers";
import TableEmpresas from "../components/TableEmpresas";

const Configuracoes = () => {
  // Estado para armazenar a aba selecionada
  const [activeTab, setActiveTab] = useState("Usuarios");

  // Função para mudar a aba
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=" bg-slate-800 justify-center px-10">
      <div className="space-y-6">
        <h2 className="text-slate-100 font-bold text-center text-3xl">Configurações</h2>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === "Usuarios" ? "border-blue-600 text-blue-600" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}
                onClick={() => handleTabClick("Usuarios")}
              >
                Usuários
              </button>
            </li>
            <li className="me-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === "Empresas" ? "border-blue-600 text-blue-600" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}
                onClick={() => handleTabClick("Empresas")}
              >
                Empresas
              </button>
            </li>
            <li className="me-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === "Enderecos" ? "border-blue-600 text-blue-600" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}
                onClick={() => handleTabClick("Enderecos")}
              >
                Endereços
              </button>
            </li>
            <li className="me-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === "Outros" ? "border-blue-600 text-blue-600" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}
                onClick={() => handleTabClick("Outros")}
              >
                Outros
              </button>
            </li>
          </ul>
        </div>

        {/* Renderização condicional com base na aba ativa */}
        <div className="mt-4 text-center">
          {activeTab === "Usuarios" && <TableUser />}
          {activeTab === "Empresas" && <TableEmpresas/>}
          {activeTab === "Enderecos" && <div>Componente de Endereços</div>}
          {activeTab === "Outros" && <div>Componente de Outros</div>}
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
