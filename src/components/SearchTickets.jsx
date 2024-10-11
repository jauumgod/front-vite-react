import { Search } from "lucide-react";
import React, {useState} from "react";

const SearchTickets = ({onSearch}) =>{
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch =()=>{
        onSearch(searchTerm);
    };

    return (
        <div className="flex items-center text-black">
            <input
            type="text"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            placeholder="Buscar Ticket"
            className="p-2 rounded border border-gray-300"
            />
            <button
            onClick={handleSearch}
            className="ml-2 p-2 bg-blue-500 text-white rounded"
            >
                <Search/>
            </button>
        </div>
    )
}

export default SearchTickets;