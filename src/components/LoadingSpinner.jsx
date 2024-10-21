import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="w-12 h-12 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
    <span className="ml-2">Carregando tickets...</span>
  </div>
);

export default LoadingSpinner;
