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
  
  // Estado para notificações
  const [notifications, setNotifications] = useState([]);

  // Função de login
  const login = (userData) => setUser(userData);

  // Função de logout
  const logout = () => setUser(null);

  // Função para adicionar notificação
  const addNotification = (message, type) => {
    setNotifications([...notifications, { message, type, id: Date.now() }]);
  };

  // Função para remover notificação por id
  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
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
        notifications, // Expondo as notificações no contexto
        addNotification, // Expondo a função de adicionar notificação
        removeNotification, // Expondo a função de remover notificação
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
