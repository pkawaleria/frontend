import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CategoryDetails from "./CategoryDetails";
import {fetchCategoryDetails, fetchSubcategories} from "../../services/categoryService";
import { isSuperAdmin, canAddCateogires } from '../admins/utils/PermissionsCheck';
import {formatToUrlOption} from "../../services/formattingUtils";

const CategoryWithSubcategories = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [subcategoriesData, setSubcategoriesData] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [isAdmin, setisAdmin] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [subcategories, categoryDetails] = await Promise.all([
                    fetchSubcategories(id),
                    fetchCategoryDetails(id)
                ]);

                setSubcategoriesData(subcategories);
                setCurrentCategory(categoryDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        try {
            if(isSuperAdmin(localStorage.getItem("accessToken")) || canAddCateogires(localStorage.getItem("accessToken"))){
                setisAdmin(true);
            }
        } catch (error) {
            
        }{}
    }, [id]);

    if (!currentCategory) return null;

    function navigateToAuctions() {
        let category = formatToUrlOption(currentCategory.name, currentCategory.id);
        navigate(`/?selectedCategory=${category}`);
    }

    return (
        <div className="w-8/12 mx-auto space-y-4 mb-4">
            <div className="w-full shadow-xl rounded-lg bg-white p-4 border-t-4 border-indigo-500">
                <h5 className="font-bold text-xl mb-2">{currentCategory.name}</h5>
                <p className="text-gray-600 mb-2">{currentCategory.description}</p>
                <button onClick={navigateToAuctions} className="bg-blue-600 text-white py-1 px-3 rounded mr-2 hover:bg-blue-700">Pokaż aukcje
                </button>
                {isAdmin && (
                    <>
                        <button className="bg-red-600 text-white py-1 px-3 rounded mr-2 hover:bg-red-700">Usuń</button>
                        <button className="bg-blue-400 text-white py-1 px-3 rounded hover:bg-blue-500">Wyświetl
                            szczegóły
                        </button>
                    </>
                )}
                <div className="mt-2">
                    <small className="text-gray-400">Liczba podkategorii: {currentCategory.subcategories.length}</small>
                </div>
            </div>

            <div className="w-10/12 mx-auto space-y-4">
                {subcategoriesData.map(subcatData => (
                    <CategoryDetails key={subcatData.id} categoryData={subcatData} parentCategoryId={id}/>
                ))}
            </div>
        </div>
    );
};

export default CategoryWithSubcategories;
