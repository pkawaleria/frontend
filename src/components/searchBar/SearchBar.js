import React, { useState, useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";

import axios from "axios";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityName, setCityName] = useState("");
  const [dataList, setDataList] = useState([]);
  const [cityId, setCityId] = useState("");
  const [isCityListVisible, setCityListVisible] = useState(false);
  const [isProvinceListVisible, setProvinceListVisible] = useState(false);
  const [provinces, setProvinces] = useState([
    "Dolnośląskie",
    "Kujawsko-pomorskie",
    "Lubelskie",
    "Lubuskie",
    "Łódzkie",
    "Małopolskie",
    "Mazowieckie",
    "Opolskie",
    "Podkarpackie",
    "Podlaskie",
    "Pomorskie",
    "Śląskie",
    "Świętokrzyskie",
    "Warmińsko-mazurskie",
    "Wielkopolskie",
    "Zachodniopomorskie",
  ]);
  const [searchRadius, setSearchRadius] = useState(0);

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
            searchCityName: nameRef.current.value,
          },
        }
      );
      setDataList(response.data.cities);
      setProvinceListVisible(false);
      setCityListVisible(true);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania sugestii miast:", error);
    }
  };

  const handleCitySelect = (selectedCityId, cityName2) => {
    setCityId(selectedCityId);
    setCityName(cityName2);
    setCityListVisible(false);
  };

  const handleProvinceClick = (provinceName) => {
    setCityName(provinceName);
    setCityId(0);
    setProvinceListVisible(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (cityId) {
      console.log("Wyszukaj:", searchTerm, "Województwo:", cityName, "Promień:", searchRadius);
    } else {
      console.log("Nie wybrano miasta. Wybierz miasto przed wyborem promienia.");
    }
  };

  return (
    <div className="h-[10%] pt-5 pb-[30px] w-full mx-auto flex justify-between items-center bg-blue-500/20">
      <form className="w-2/3 flex flex-row items-center border-white border-2 rounded-md shadow-3xl mx-auto">
        <div className="w-[75%] mx-2 my-[10px]">
          <input
            type="text"
            className="px-4 py-3 outline-none border-white hover:placeholder:font-semibold rounded w-full font-semibold placeholder:font-normal text-gray-700"
            placeholder="Wyszukaj..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="mb-4 relative">
          <FaMapMarkerAlt size={25} className="inline-block mr-2" />
          <input
            type="text"
            id="city"
            name="city"
            value={cityName}
            onFocus={() => {
              setProvinceListVisible(true);
            }}
            onChange={(e) => {
              setCityName(e.target.value);
              fetchCities();
            }}
            ref={nameRef}
            className="w-[75%] px-2 py-3 outline-none border-white hover:placeholder:font-semibold rounded font-semibold placeholder:font-normal text-gray-700 mt-4"
          />
          {isCityListVisible &&  (
            <div className="absolute left-8 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-[50%] z-10">
              <ul>
                {dataList.map((city) => (
                  <li
                    key={city.id}
                    onClick={() => handleCitySelect(city.id, city.name)}
                  >
                    <div
                      className="py-1 px-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => handleCitySelect(city.id, city.name)}
                    >
                      {city.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isProvinceListVisible && (
            <div className="absolute left-8 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-[60%] z-10">
              <ul>
                {provinces.map((province) => (
                  <li
                    key={province}
                    onClick={() => handleProvinceClick(province)}
                  >
                    <div
                      className="py-1 px-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => handleProvinceClick(province)}
                    >
                      {province}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-[10%] relative">
          <select
            value={searchRadius}
            onChange={(e) => setSearchRadius(e.target.value)}
            className="w-full px-2 py-3 outline-none border-white hover:placeholder:font-semibold rounded font-semibold placeholder:font-normal text-gray-700"
            disabled={!cityId}
          >
            <option value="0">0 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
            <option value="40">40 km</option>
            <option value="50">50 km</option>
            <option value="75">75 km</option>
            <option value="100">100 km</option>
          </select>
        </div>
        <div className="w-[5%] text-center mx-2">
          <button
            type="submit"
            className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-500/40 ease-linear duration-200"
            onClick={handleSearchSubmit}
          >
            <BiSearchAlt2 className="text-[2vw]" />
          </button>
        </div>
      </form>
    </div>
  );
}
