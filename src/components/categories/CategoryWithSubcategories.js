import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryDetails from './CategoryDetails';
import { fetchCategoryDetails, fetchSubcategories } from '../../services/categoryService';
import { isSuperAdmin, canAddCateogires } from '../admins/utils/PermissionsCheck';
import { formatToUrlOption } from '../../services/formattingUtils';
import { useFontSize } from "../fontSize/FontSizeContext"

const CategoryWithSubcategories = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [subcategoriesData, setSubcategoriesData] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [isAdmin, setisAdmin] = useState(false);
    const {isFontLarge} = useFontSize();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [subcategories, categoryDetails] = await Promise.all([fetchSubcategories(id), fetchCategoryDetails(id)]);

                setSubcategoriesData(subcategories);
                setCurrentCategory(categoryDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        try {
            if (isSuperAdmin(localStorage.getItem('accessToken')) || canAddCateogires(localStorage.getItem('accessToken'))) {
                setisAdmin(true);
            }
        } catch (error) {
            console.error('Error checking permissions:', error);
        }
    }, [id]);

    if (!currentCategory) return null;

    function navigateToAuctions() {
        let category = formatToUrlOption(currentCategory.name, currentCategory.id);
        navigate(`/?selectedCategory=${category}`);
    }

    return (
        <div className="w-[90%] md:w-8/12 lg:w-8/12 mx-auto space-y-4 mb-4 min-h-screen">
            <div className="w-full shadow-xl rounded-lg bg-white dark:bg-neutral-600 p-4 border-t-4 border-indigo-500 dark:border-neutral-100">
                <p className={`font-bold ${isFontLarge ? "text-3xl" : "text-xl"} mb-2 dark:text-neutral-50`}>{currentCategory.name}</p>
                <p className={`${isFontLarge ? "text-xl" : "text-lg"} text-gray-600 dark:text-neutral-200 mb-2`}>{currentCategory.description}</p>
                <button
                    onClick={navigateToAuctions}
                    className={`${isFontLarge ? "text-xl" : "text-lg"} bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800 text-white py-1 px-3 rounded mr-2 hover:bg-blue-700`}>
                    Pokaż aukcje
                </button>
                {isAdmin && (
                    <>
                        <button className={`${isFontLarge ? "text-xl" : "text-lg"} bg-red-600 text-white py-1 px-3 rounded mr-2 hover:bg-red-700`}>Usuń</button>
                        <button className={`${isFontLarge ? "text-xl" : "text-lg"} bg-blue-400 text-white py-1 px-3 rounded hover:bg-blue-500`}>Wyświetl szczegóły</button>
                    </>
                )}
                <div className="mt-2">
                    <p className={`${isFontLarge ? "text-lg" : "text-sm"} text-gray-400 dark:text-neutral-300`}>
                        Liczba podkategorii: {currentCategory.subcategories.length}
                    </p>
                </div>
            </div>

            <div className="w-full md:w-10/12 lg:w-10/12 mx-auto space-y-4">
                {subcategoriesData.map((subcatData) => (
                    <CategoryDetails key={subcatData.id} categoryData={subcatData} parentCategoryId={id} />
                ))}
            </div>
        </div>
    );
};

export default CategoryWithSubcategories;
