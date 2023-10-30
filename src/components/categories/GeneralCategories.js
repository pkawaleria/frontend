import React, { useState, useEffect } from 'react';
import { fetchTopLevelCategories } from '../../services/categoryService';
import {useNavigate} from "react-router-dom";

const GeneralCategories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {

        fetchTopLevelCategories()
            .then(data => setCategories(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="grid grid-cols-3 gap-8 p-8">
            {categories.map(category => (
                <div
                    key={category.id}
                    className="bg-gray-200 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => navigate(`/subcategories/${category.id}`)}
                >
                    <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                    <p className="text-gray-600">{category.description}</p>
                </div>
            ))}
        </div>
    );
};

export default GeneralCategories;
