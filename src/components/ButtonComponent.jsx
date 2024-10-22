import React from "react";

const ButtonComponent = ({ nameButton, onClick, isActive }) => (
    <button
      onClick={onClick}
      className={`rounded-md ${isActive ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-600 text-white px-4 py-2`}
    >
      {nameButton}
    </button>
  );
  

export default ButtonComponent