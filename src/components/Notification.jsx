import React, { useState } from 'react';

const Notification = ({ message, type, show, onClose }) => {
  if (!show) return null;

  // Definindo as cores e o ícone baseados no tipo de notificação
  const typeStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };

  const typeIcons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div className={`fixed top-4 right-4 w-64 p-4 border-l-4 rounded-md shadow-lg ${typeStyles[type]}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <span className="mr-2 text-xl">{typeIcons[type]}</span>
          <div>
            <p className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
            <p>{message}</p>
          </div>
        </div>
        <button onClick={onClose} className="ml-4 font-bold text-lg hover:text-gray-900">✖</button>
      </div>
    </div>
  );
};

export default Notification;


// const [showNotification, setShowNotification] = useState(true);
// <Notification 
// show={showNotification}
// type="success" 
// message="Operação realizada com sucesso!" 
// onClose={() => setShowNotification(false)}
// />