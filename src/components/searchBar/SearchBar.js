import React, { useState, useRef } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';

import axios from "axios";

export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [cityName, setCityName] = useState("");
    const [dataList, setDataList] = useState([]);
    const [cityId, setCityId] = useState();
    const [isCityListVisible, setCityListVisible] = useState(false);

    const nameRef = useRef(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetchCities = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_AUCTIONS_MS_CITIES_SEARCH_URL}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    params: {
                        searchCityName: nameRef.current.value
                    }
                }
            );
            setDataList(response.data.cities);
            setCityListVisible(true);
        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania sugestii miast:", error);
        }
    };

    const handleCitySelect = (selectedCityId, cityName2) => {
        setCityId(selectedCityId);
        setCityName(cityName2); // Aktualizacja zawartości pola cityName
        setCityListVisible(false);
        console.log(cityName2); // Używaj cityName2, który jest nową nazwą miasta
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Wyszukaj:', searchTerm, 'Województwo:', selectedProvince);
    };

    return (
        <div className="h-[10%] pt-5 pb-[30px] w-full mx-auto flex justify-between items-center bg-blue-500/20">
            <form className="w-2/3 flex flex-row items-center border-white border-2 rounded-md shadow-3xl mx-auto">
                <div className='w-[75%] mx-3 my-[10px]'>
                    <input
                        type="text"
                        className="px-4 py-3 outline-none border-white hover:placeholder:font-semibold rounded w-full font-semibold placeholder:font-normal text-gray-700"
                        placeholder="Wyszukaj..."
                        value={searchTerm}
                        onChange={handleSearchChange} />
                </div>
                <div className="mb-4 relative">
                    <FaMapMarkerAlt size={25} className="inline-block mr-2" />
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={cityName}
                        onChange={(e) => {
                            setCityName(e.target.value);
                            fetchCities();
                        }}
                        onBlur={() => {
                            setCityListVisible(false);
                        }}
                        ref={nameRef}
                        className={`w-[50%] p-2 border border-blue-500 rounded-md focus:outline-none`}
                        required
                        list="cities"
                    />
                    {isCityListVisible && (
                        <datalist className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-[50%] z-10" id="cities">
                            {dataList.map((city) => (
                                <option
                                    key={city.id}
                                    className="py-1 px-2 hover:bg-blue-100 cursor-pointer"
                                    onClick={() => handleCitySelect(city.id, city.name)}
                                >
                                    {city.name}
                                </option>
                            ))}
                        </datalist>
                    )}
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
