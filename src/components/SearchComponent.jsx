import { Search } from 'lucide-react';
import React, { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [sequencia, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cliente, setCliente] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ cliente, sequencia, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit}
    className="flex mb-4 text-black"
    >
    <input
    type="text"
    placeholder="Cliente"
    value={cliente}
    onChange={(e) => setCliente(e.target.value)}
    className="border rounded p-2 mr-2"
  />


      <input
        type="text"
        placeholder="Pesquisar ticket"
        value={sequencia}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2 mr-2"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border rounded p-2 mr-2"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border rounded p-2 mr-2"
      />
        <button type="submit"
        className="rounded-md bg-blue-500 p-2 text-white mr-2 hover:bg-blue-400">
          <Search/>
        </button>
    </form>
  );
};

export default SearchComponent;
