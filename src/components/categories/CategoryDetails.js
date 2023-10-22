import React from 'react';
import {useNavigate} from 'react-router-dom';
import {FaArrowRight, FaChevronRight} from 'react-icons/fa';

const CategoryDetails = ({parentCategoryId, categoryData}) => {
    const navigate = useNavigate();

    return (
        <div
            className="category-details bg-gray-200 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate(`/subcategories/${categoryData.id}`)}
        >
            {/* Wyświetlenie ścieżki */}
            <div className="mb-2 flex items-center space-x-2">
                <button
                    className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-l-md cursor-pointer hover:bg-blue-100"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/kategorie`);
                    }}
                >
                    Kategorie główne
                </button>

                <FaArrowRight className="cursor-pointer"/>

                {categoryData.path.path.map((pathItem, index, array) => (
                    <React.Fragment key={pathItem.id}>
                        <button
                            className={`flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-l-md ${pathItem.id === parentCategoryId ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-100'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (pathItem.id !== parentCategoryId) {
                                    navigate(`/subcategories/${pathItem.id}`);
                                }
                            }}
                        >
                            <FaChevronRight className="text-blue-500"/>
                            <span>{pathItem.name}</span>
                        </button>
                        {index !== array.length - 1 && <FaArrowRight className="cursor-pointer"/>}
                    </React.Fragment>
                ))}
            </div>

            {/* Delikatna kreska oddzielająca ścieżkę od danych kategorii */}
            <div className="border-b border-gray-300 my-2"></div>

            <h2 className="text-xl font-semibold mb-2">{categoryData.name}</h2>
            <p className="text-gray-600">{categoryData.description}</p>
        </div>
    );
};

export default CategoryDetails;
