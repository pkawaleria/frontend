import React, {useEffect, useState} from "react";
import {BiChevronDown, BiChevronUp, BiSearchAlt2, BiSortDown, BiSortUp} from "react-icons/bi";
import { FaStream } from 'react-icons/fa';
import {FaMapMarkerAlt} from "react-icons/fa";
import {fetchCategoriesByName, fetchTopLevelCategories} from "../../services/categoryService";
import {searchCities} from "../../services/citiesService";
import Select from "react-select";
import '../../assets/styles/searchbar/searchbar.css'
import CreatableSelect from "react-select/creatable";


const radiusOptions = [
    { label: '0 km', value: '0' },
    { label: '20 km', value: '20' },
    { label: '30 km', value: '30' },
    { label: '40 km', value: '40' },
    { label: '50 km', value: '50' },
];

const provinces = [
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
];

const sortOptions = [
    { value: 'price', label: 'Cena' },
    { value: 'name', label: 'Nazwa' },
    // TODO: dodać więcej
];

export default function SearchBar() {
    const [searchedCities, setSearchedCities] = useState([]);
    const [searchedCategories, setSearchedCategories] = useState([]);
    const [rootCategories, setRootCategories] = useState([]);
    const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);

    const [searchedTermInAuctionName, setSearchedTermInAuctionName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProvinceName, setSelectedProvinceName] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [selectedRadius, setSelectedRadius] = useState(0);
    const [selectedSortByField, setSelectedSortByField] = useState(sortOptions[0]);
    const [selectedSortOrder, setSelectedSortOrder] = useState('ASC');




    useEffect(() => {
        fetchTopLevelCategories().then(categories => {
            setRootCategories(formatToOptions(categories))
            setSearchedCategories(formatToOptions(categories));
        });
    }, []);

    const handleToggleOptions = () => {
        setIsOptionsExpanded(!isOptionsExpanded);
    };

    const handleSortChange = (order) => {
        setSelectedSortOrder(order);
    };

    const handleCategoryInputChange = (inputValue) => {
        if (inputValue == null || !String(inputValue).trim()) {
            setSearchedCategories(rootCategories);
        } else {
            fetchCategoriesByName(inputValue).then(foundCategories =>
                setSearchedCategories(formatToOptions(foundCategories))
            );
        }
    };
    const handleCategorySelectionChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
    };

    const handleSearchChange = (event) => {
        setSearchedTermInAuctionName(event.target.value);
    };


    const handleRadiusChange = (newValue, actionMeta) => {
        if (actionMeta.action === 'create-option' && parseInt(newValue.value, 10) < 0) {
            alert('Odległość nie może być ujemna.');
            return;
        }
        setSelectedRadius(newValue);
    };



    const handleSearchSubmit = (event) => {
        event.preventDefault();

        console.log()
    };

    const formatToOptions = (array) => {
        return (Array.isArray(array) ? array : []).map(element => ({
            value: element.id,
            label: element.name
        }));
    }

    const formatProvincesToOptions = (array) => {
        return (Array.isArray(array) ? array : []).map(element => ({
            value: element,
            label: element
        }));
    }

    const handleCityInputChange = (inputValue) => {
        if (inputValue) {
            searchCities(inputValue).then(
                cities => setSearchedCities(formatToOptions(cities))
            );
            setSelectedCityId(null);
            setSelectedProvinceName(null);
        }
    };

    const handleCitySelectionChange = (selectedOption) => {
        setSelectedCityId(selectedOption);
        setSelectedProvinceName(null);
    };

    const handleProvinceSelectionChange = (selectedOption) => {
        setSelectedProvinceName(selectedOption);
        setSelectedCityId(null);
        setSelectedRadius(0);
    };

    const handleSortFieldChange = (selectedOption) => {
        setSelectedSortByField(selectedOption);
    };

    const toggleSortOrder = () => {
        setSelectedSortOrder((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'));
    };


    return (
        <div className="bg-blue-500/20 pt-5 pb-7 sm:pb-8">
            <form onSubmit={handleSearchSubmit}
                  className="search-form max-w-6xl mx-auto bg-white border-2 border-white rounded-md shadow-3xl p-4 flex flex-wrap justify-between gap-4"
                  style={{ width: '90%' }}>

                {/* Pole wpisania nazwy aukcji */}
                <div className="flex-1 min-w-0">
                    <div className="input-wrapper flex items-center rounded border-2 border-gray-300">
                        <input
                            type="text"
                            className="w-full py-2 pl-3 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded"
                            placeholder="Wpisz nazwę aukcji"
                            value={searchedTermInAuctionName}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Grupa lokalizacji */}
                <div className="flex flex-1 min-w-0 items-center gap-2">
                    {/* Ikonka lokalizacji */}
                    <FaMapMarkerAlt className="text-white text-3xl"/>

                    {/* Pole wpisania nazwy miasta */}
                    <Select
                        value={selectedCityId}
                        onChange={handleCitySelectionChange}
                        onInputChange={handleCityInputChange}
                        options={searchedCities}
                        placeholder="Miasto"
                        className="text-gray-700 react-select-container flex-grow"
                        classNamePrefix="react-select"
                        isClearable
                    />

                    {/* Pole wyboru odległości */}
                    <CreatableSelect
                        isClearable
                        onChange={handleRadiusChange}
                        options={radiusOptions}
                        placeholder="Odległość"
                        className="react-select-container flex-grow"
                        classNamePrefix="react-select"
                        value={selectedRadius}
                        isDisabled={!selectedCityId}
                    />
                </div>
                <div className="flex flex-1 min-w-0 items-center gap-2">
                    {/* Ikonka kategorii */}
                    <FaStream className="text-white text-3xl"/>

                    <Select
                        value={selectedCategory}
                        onChange={handleCategorySelectionChange}
                        onInputChange={handleCategoryInputChange}
                        options={searchedCategories}
                        placeholder="Kategoria"
                        className="text-gray-700 react-select-container flex-grow"
                        classNamePrefix="react-select"
                        isClearable
                    />
                </div>

                {/* Ikonka wyszukiwania */}
                <div className="flex justify-center items-center min-w-0">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150"
                    >
                        <BiSearchAlt2 className="text-[2vw]" />
                    </button>
                </div>

                {/* Ikonka rozwijania opcji */}
                <div className="w-full flex justify-center py-2">
                    <button
                        type="button"
                        onClick={handleToggleOptions}
                        className="text-blue-500 hover:text-blue-600 transition duration-150"
                    >
                        {isOptionsExpanded ? <BiChevronUp className="text-white text-3xl"/> : <BiChevronDown className="text-white text-3xl"/>}
                        <span className="hidden sm:inline"> Rozwiń dodatkowe opcje</span>
                    </button>
                </div>

                {/* Dodatkowe opcje */}
                {isOptionsExpanded && (
                    <div className="w-full pt-4">
                        <div className="flex flex-wrap gap-2">
                            <div className="flex-1 max-w-1/2">
                                <Select
                                    value={selectedProvinceName}
                                    onChange={handleProvinceSelectionChange}
                                    options={formatProvincesToOptions(provinces)}
                                    placeholder="Województwo"
                                    className="text-gray-700 react-select-container w-full"
                                    classNamePrefix="react-select"
                                    isClearable
                                />
                            </div>
                            <div className="flex-1 flex items-center">
                                <Select
                                    id="sortSelect"
                                    value={selectedSortByField}
                                    onChange={handleSortFieldChange}
                                    options={sortOptions}
                                    placeholder="Sortuj po" // Dodany placeholder zamiast etykiety
                                    className="cursor-pointer rounded border-2 border-gray-300 bg-white p-2 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    classNamePrefix="react-select"
                                />
                                <div
                                    className="ml-2 cursor-pointer"
                                    onClick={toggleSortOrder}
                                >
                                    {selectedSortOrder === 'ASC' ? (
                                        <BiSortUp className="text-white text-3xl" />
                                    ) : (
                                        <BiSortDown className="text-white text-3xl" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
