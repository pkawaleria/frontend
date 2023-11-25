import React, {useEffect, useState} from "react";
import {BiChevronDown, BiChevronUp, BiSearchAlt2, BiSortDown, BiSortUp} from "react-icons/bi";
import {FaMapMarkerAlt, FaStream} from 'react-icons/fa';
import {fetchCategoriesByName, fetchTopLevelCategories} from "../../services/categoryService";
import {searchCities} from "../../services/citiesService";
import Select from "react-select";
import '../../assets/styles/searchbar/searchbar.css'
import CreatableSelect from "react-select/creatable";


const radiusOptions = [
    {label: '0 km', value: '0'},
    {label: '20 km', value: '20'},
    {label: '30 km', value: '30'},
    {label: '40 km', value: '40'},
    {label: '50 km', value: '50'},
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

export default function SearchBar({
                                      selectedCategory,
                                      setSelectedCategory,
                                      selectedProvinceName,
                                      setSelectedProvinceName,
                                      selectedCityId,
                                      setSelectedCityId,
                                      selectedRadius,
                                      setSelectedRadius,
                                      selectedSortByField,
                                      setSelectedSortByField,
                                      selectedSortOrder,
                                      setSelectedSortOrder,
                                      searchedTermInAuctionName,
                                      setSearchedTermInAuctionName,
                                      onSearch
                                  }) {
    const [searchedCities, setSearchedCities] = useState([]);
    const [searchedCategories, setSearchedCategories] = useState([]);
    const [rootCategories, setRootCategories] = useState([]);
    const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);


    const [sortOptions, setSortOptions] = useState([
        {value: 'price', label: 'Cena'},
        {value: 'name', label: 'Nazwa'},
    ]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [topLevelCategories, cities] = await Promise.all([
                    fetchTopLevelCategories(),
                    searchCities(''),
                ]);

                setRootCategories(formatToOptions(topLevelCategories));
                setSearchedCategories(formatToOptions(topLevelCategories));
                setSearchedCities(formatToOptions(cities));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleToggleOptions = () => {
        setIsOptionsExpanded(!isOptionsExpanded);
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
        onSearch();

        console.log('Searched Term in Auction Name:', searchedTermInAuctionName);
        console.log('Selected Category:', selectedCategory);
        console.log('Selected Province Name:', selectedProvinceName);
        console.log('Selected City Id:', selectedCityId);
        console.log('Selected Radius:', selectedRadius);
        console.log('Selected Sort By Field:', selectedSortByField);
        console.log('Selected Sort Order:', selectedSortOrder);
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
        }
    };

    const handleCitySelectionChange = (selectedOption) => {
        setSelectedCityId(selectedOption);
    };

    const handleProvinceSelectionChange = (selectedOption) => {
        setSelectedProvinceName(selectedOption);
    };

    const handleSortFieldChange = (selectedOption) => {
        setSelectedSortByField(selectedOption);
    };

    const toggleSortOrder = () => {
        setSelectedSortOrder((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'));
    };

    return (
        <div className="bg-blue-500/20 pt-5 pb-7 sm:pb-8">
            <form
                  className="search-form max-w-6xl mx-auto bg-white border-2 border-white rounded-md shadow-3xl px-4 pt-4 pb-0 flex flex-wrap justify-between gap-2"
                  style={{width: '90%'}}>

                {/* Pole wpisania nazwy aukcji */}
                <div className="flex-1 min-w-0">
                    <div className="input-wrapper flex items-center rounded border-0 border-gray-300">
                        <input
                            type="text"
                            className="w-full py-2 px-3 placeholder-gray-500 border-0 outline-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded"
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
                        type="button"
                        onClick={handleSearchSubmit}
                        className="px-2 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600/50 transition duration-150">
                        <BiSearchAlt2 className="text-[2vw]"/>
                    </button>
                </div>

                {/* Ikonka rozwijania opcji */}
                <div className="w-full flex justify-center">
                    <button
                        type="button"
                        onClick={handleToggleOptions}
                        className="text-blue-500 hover:text-blue-600 transition duration-150">
                        {isOptionsExpanded ? <BiChevronUp className="text-white text-3xl"/> :
                            <BiChevronDown className="text-white text-3xl"/>}
                        <span className="hidden sm:inline"> Rozwiń dodatkowe opcje</span>
                    </button>
                </div>

                {/* Dodatkowe opcje */}
                {isOptionsExpanded && (
                    <div className="w-full pt-0">
                        <div className="flex flex-wrap gap-2 pb-4 items-center">
                            <div className="w-2/5">
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
                                    value={selectedSortByField}
                                    onChange={handleSortFieldChange}               
                                    options={sortOptions}
                                    placeholder="Sortuj po"
                                    className="text-gray-700 react-select-container w-full cursor-pointer rounded"
                                    classNamePrefix="react-select"
                                    isClearable/>
                                <div
                                    className="ml-2 cursor-pointer"
                                    onClick={toggleSortOrder}>
                                    {selectedSortOrder === 'ASC' ? (
                                        <BiSortUp className="text-white text-3xl hover:text-blue-400 duration-100 ease-linear"/>
                                    ) : (
                                        <BiSortDown className="text-white text-3xl hover:text-blue-400 duration-100 ease-linear"/>
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
