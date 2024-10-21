import React from "react";
import { useAppContext } from "../context/AppContext"; // Supondo que o contexto está na pasta context

const Notification = () => {
  const { ticketCriado } = useAppContext();

  return (
    ticketCriado && (
      <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
        Novo Ticket Foi criado.
      </div>
    )
  );
};

export default Notification;
