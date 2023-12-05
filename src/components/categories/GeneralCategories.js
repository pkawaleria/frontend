import React, { useState, useEffect } from 'react';
import { fetchTopLevelCategories } from '../../services/categoryService';
import { useNavigate } from 'react-router-dom';
import { useFontSize } from '../fontSize/FontSizeContext';

const GeneralCategories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const {isFontLarge} = useFontSize();

    useEffect(() => {
        fetchTopLevelCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="w-full sm:w-full md:w-full lg:w-full xl:w-full bg-gray-200 dark:bg-neutral-600 dark:text-neutral-200 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => navigate(`/podkategorie/${category.id}`)}>
                    <p className={`${isFontLarge ? "text-3xl" : "text-xl"} font-semibold mb-2`}>{category.name}</p>
                    <p className={`${isFontLarge ? "text-xl" : "text-lg"} text-gray-600 dark:text-neutral-200`}>{category.description}</p>
                </div>
            ))}
        </div>
    );
};

export default GeneralCategories;
