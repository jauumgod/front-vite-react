import React, {createContext, useState} from "react";


export const AppContext = createContext();

export const AppProvider = ({children}) =>{
    const [ticketCriado, setTicketCriado] = useState(false);

    return (
        <AppContext.Provider value={{ticketCriado, setTicketCriado}}>
            {children}
        </AppContext.Provider>
    )
}