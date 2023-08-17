import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Wyszukaj:', searchTerm, 'Województwo:', selectedProvince);
    };

    return (
        <div className="w-2/3 border-2 border-spacing-1 border-white border-opacity-70 rounded-md shadow-3xl mx-auto flex justify-between items-center">
            <form className="w-full flex items-center">
                <input
                    type="text"
                    className="mt-2 ml-2 mb-2 py-2 px-4 border-[1px] border-blue-600 rounded-2 focus:outline-none focus:border-blue-400 w-[70%] hover:scale-[1.02]"
                    placeholder="Wyszukaj..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="relative flex items-center hover:scale-[1.02]">
                    <FaMapMarkerAlt className="absolute left-3 text-gray-500" />
                    <select
                        className="py-2 pl-8 pr-4 border-[1px] border-blue-600 focus:outline-none focus:border-blue-400 hover:cursor-pointer"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                    >
                        <option value="">Wybierz województwo</option>
                        <option value="dolnośląskie">Dolnośląskie</option>
                        <option value="kujawsko-pomorskie">Kujawsko-Pomorskie</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className=" mr-2 bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none w-[10%] flex items-center justify-center hover:scale-[1.02]"
                    onClick={handleSearchSubmit}
                >
                    <BiSearch size={31} />
                </button>
            </form>
        </div>
    );
}
