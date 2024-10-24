import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Bell, BellDot, CircleUser } from "lucide-react";
import LogoutUser from "./LogoutUser";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [grupoUserId, setGrupoUserId] = useState(null);
  const notificacoes = useContext(AppContext).notificacoes;


  // Simulando a recuperação do ID do usuário do localStorage ou outra fonte
  useEffect(() => {
    const storedUserId = localStorage.getItem('grupo');
    setGrupoUserId(parseInt(storedUserId));    
  }, []);


  const handleLogout = () => {
    LogoutUser();
    navigate('/logout');
  };

  const SEFAZ = 'https://www.nfe.fazenda.gov.br/portal/disponibilidade.aspx';

  return (
    <div>
      <nav className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Botão de menu mobile */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Exibir todas as rotas se o ID do usuário for diferente de 3 */}
                  {grupoUserId === 1 ||grupoUserId=== 2 ? (
                    <>
                      <Link
                        to="/home"
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        aria-current="page"
                      >
                        Dashboard
                      </Link>
                      {/* <Link
                        to="/novo"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Novo Ticket
                      </Link> */}
                      <Link
                        to="/tickets"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Tickets
                      </Link>
                      <Link
                        to="/config"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Configurações
                      </Link>
                      <Link
                        to={SEFAZ}
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Status Sefaz
                      </Link>

                    </>
                  ) : (
                    // Caso o ID seja 3, mostrar apenas uma rota
                    <>
                  <Link
                    to="/novo"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Novo Ticket
                  </Link>
                    <Link
                      to="/mytickets/"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Meus Tickets
                    </Link>
                    <Link
                      to={SEFAZ}
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        Status Sefaz
                    </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <button
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={()=>setShowNotify((prev)=> !prev)}
                >
                <BellDot/>
                </button>
                {
                  showNotify &&(
                <div
                className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                  >
                <p className="text-black text-center">Notificações</p>
                {Array.isArray(notificacoes) && notificacoes.length === 0 ? (
                    <p className="text-black text-center">Sem notificações</p>
                ) : (
                    notificacoes.map((notificacao, index) => (
                        <div key={index} className="p-2 border-b">
                            <p className="font-bold">{notificacao.titulo}</p>
                            <p className="text-gray-600">{notificacao.empresa}</p>
                        </div>
                    ))
                )}

            </div>
            )}
          </div>
              
              <div className="relative inline-block text-left pl-2">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  <span className="sr-only">Open user menu</span>
                  <CircleUser className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-300" />
                </button>
                {/* Menu suspenso */}
                {showMenu && (
                  <div
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => navigate("/userinfo")}
                    >
                      Informações do Usuário
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => alert('Configurações')}
                    >
                      Configurações
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Exibir todas as rotas no mobile se o ID do usuário for diferente de 3 */}
            {grupoUserId !== 3 ? (
              <>
                <Link
                  to="/home"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                >
                  Dashboard
                </Link>
                <Link
                  to="/novo"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Novo Ticket
                </Link>
                <Link
                  to="/tickets"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Tickets
                </Link>
                <Link
                  to="/config"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Configurações
                </Link>
              </>
            ) : (
              <Link
                to="/tickets"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Tickets
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
