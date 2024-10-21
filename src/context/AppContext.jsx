import React, { createContext, useContext, useState } from "react";

// Criação do contexto
export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

// Provedor do contexto
export const AppProvider = ({ children }) => {
  const [ticketCriado, setTicketCriado] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [totalConcluidos, setTotalConcluidos] = useState(0);
  

  // Função de login
  const login = (userData) => setUser(userData);

  // Função de logout
  const logout = () => setUser(null);

  // Função para adicionar notificação
  const [notificacoes, setNotificacoes] = useState([]);

  const adicionarNotificacao = (titulo, empresa) => {
    setNotificacoes(prev => [...prev, { id: Date.now(), titulo, empresa }]);
};


  const removeNotification = (id) => {
    setNotificacoes(prev => prev.filter(notification => notification.id !== id));
};


  return (
    <AppContext.Provider
      value={{
        ticketCriado,
        setTicketCriado,
        isLoading,
        setIsLoading,
        user,
        setUser,
        login,
        logout,
        totalConcluidos,
        setTotalConcluidos,
        notificacoes, // Expondo as notificações no contexto
        adicionarNotificacao, // Expondo a função de adicionar notificação
        removeNotification, // Expondo a função de remover notificação
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
