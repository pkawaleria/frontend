import React from 'react';
import {useNavigate} from 'react-router-dom';
import {FaArrowRight, FaChevronRight} from 'react-icons/fa';
import {VscListOrdered} from "react-icons/vsc";
import {formatToUrlOption} from "../../services/formattingUtils";
import { useFontSize } from '../fontSize/FontSizeContext';

const CategoryDetails = ({parentCategoryId, categoryData}) => {
    const navigate = useNavigate();
    const {isFontLarge} = useFontSize();

    function navigateToAuctions() {
        let category = formatToUrlOption(categoryData.name, categoryData.id);
        navigate(`/aukcje/szukaj/?selectedCategory=${category}`);
    }

    return (
        <div
            className="category-details bg-gray-200 dark:bg-neutral-400/70 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="absolute top-0 right-0 mt-2 mr-2">
                <VscListOrdered
                    onClick={navigateToAuctions}
                    className={`${isFontLarge ? "text-5xl" : "text-3xl"} text-blue-500 dark:text-white hover:dark:text-neutral-400 ease-linear duration-100 cursor-pointer hover:text-blue-600`}/>
            </div>
            {/* Wyświetlenie ścieżki */}
            <div className="mb-2 flex items-center space-x-2">
                <button
                    className={`${isFontLarge ? "text-xl" : " text-base"} ease-linear duration-100 flex items-center space-x-1 bg-gray-100 dark:bg-neutral-100 hover:dark:bg-neutral-300 px-3 py-1 rounded-l-md cursor-pointer hover:bg-blue-100`}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/kategorie`);
                    }}>
                    Kategorie główne
                </button>

                <FaArrowRight className="cursor-pointer"/>

                {categoryData.path.path.map((pathItem, index, array) => (
                    <React.Fragment key={pathItem.id}>
                        <button
                            className={`${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100 flex items-center space-x-1 bg-gray-100 dark:bg-neutral-100 hover:dark:bg-neutral-300 px-3 py-1 rounded-l-md ${pathItem.id === parentCategoryId ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-100'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (pathItem.id !== parentCategoryId) {
                                    navigate(`/podkategorie/${pathItem.id}`);
                                }
                            }}>
                            <FaChevronRight className="text-blue-500"/>
                            <span>{pathItem.name}</span>
                        </button>
                        {index !== array.length - 1 && <FaArrowRight className="cursor-pointer"/>}
                    </React.Fragment>
                ))}
            </div>

            {/* Delikatna kreska oddzielająca ścieżkę od danych kategorii */}
            <div className="border-b border-gray-300 my-2"></div>

            <div onClick={() => navigate(`/podkategorie/${categoryData.id}`)}>
                <p className={`${isFontLarge ? "text-3xl" : "text-xl"} font-semibold mb-2 dark:text-neutral-50`}>{categoryData.name}</p>
                <p className={`${isFontLarge ? "text-xl" : "text-base"} text-gray-600 dark:text-neutral-300`}>{categoryData.description}</p>
            </div>
        </div>
    );
};

export default CategoryDetails;
