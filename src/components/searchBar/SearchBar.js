import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
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
        <div className="h-[10%] pt-5 pb-[30px] w-full mx-auto flex justify-between items-cente bg-blue-500/20">
            <form className="w-2/3 flex flex-row items-center border-white border-2 rounded-md shadow-3xl mx-auto">
                <div className='w-[75%] mx-3 my-[10px]'>
                    <input
                        type="text"
                        className="px-4 py-3 outline-none border-white hover:placeholder:font-semibold rounded w-full font-semibold placeholder:font-normal text-gray-700"
                        placeholder="Wyszukaj..."
                        value={searchTerm}
                        onChange={handleSearchChange} />
                </div>
                <div className="w-[20%] my-[10px] relative flex items-center">
                    <FaMapMarkerAlt className="absolute left-2 text-gray-500" />
                    <select
                        className="px-6 py-2 outline-none rounded w-[100%] text-gray-700 hover:cursor-pointer hover:font-semibold"
                        value={selectedProvince}
                        onChange={handleProvinceChange}>
                        <option value="" className='bg-gray-300'>Wybierz województwo</option>
                        <option value="dolnośląskie" className='bg-gray-300'>Dolnośląskie</option>
                        <option value="kujawsko-pomorskie" className='bg-gray-300'>Kujawsko-Pomorskie</option>
                    </select>
                </div>
                <div className='w-[5%] text-center mx-2'>
                    <button
                        type="submit"
                        className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-500/40 ease-linear duration-200"
                        onClick={handleSearchSubmit}>
                        <BiSearchAlt2 className='text-[2vw]' />
                    </button>
                </div>

            </form>
        </div>
    );
}
