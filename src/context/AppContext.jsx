import React, {createContext, useState} from "react";


export const AppContext = createContext();

export const AppProvider = ({children}) =>{
    const [ticketCriado, setTicketCriado] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider value={{
        ticketCriado, setTicketCriado,
         isLoading, setIsLoading,
         user,setUser,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;