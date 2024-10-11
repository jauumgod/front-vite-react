import React, {createContext, useContext, useState} from "react";


export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);
export const AppProvider = ({children}) =>{
    const [ticketCriado, setTicketCriado] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [totalConcluidos, setTotalConcluidos] = useState(0);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AppContext.Provider value={{
        ticketCriado, setTicketCriado,
         isLoading, setIsLoading,
         user,setUser,
         login, logout,
         totalConcluidos, setTotalConcluidos,
         
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;