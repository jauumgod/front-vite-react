import React from 'react';
import ButtonComponent from "../components/ButtonComponent";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex p-2 px-5 py-2 text-center justify-end">
      <div className="p-2">
        <ButtonComponent nameButton="Início" onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
      </div>
      <div className="p-2">
        <ButtonComponent nameButton="Anterior" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
      </div>
      <div className="p-2">
        <ButtonComponent nameButton="Próximo" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
      </div>
      <div className="p-2">
        <ButtonComponent nameButton="Fim" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </div>
    </div>
  );
};

export default Pagination;
