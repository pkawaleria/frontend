import auctionMsApi from './auctionMsApi';
import {errorToast} from "./toastService";

export const fetchTopLevelCategories = async () => {
    try {
        const response = await auctionMsApi.get('/auction-service/categories/entrypoints');
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error('Error fetching top level categories:', error);
        throw error;
    }
};

export const fetchFinalNodeCategories = async () => {
    try {
        const response = await auctionMsApi.get('/auction-service/categories/endpoints');
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error('Error fetching top level categories:', error);
        throw error;
    }
};

export const fetchCategoryDetails = async (id) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/categories/${id}`);
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error('Error fetching category details:', error);
        throw error;
    }
};

export const fetchSubcategories = async (id) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/categories/${id}/subcategories`);
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error('Error fetching subcategories:', error);
        throw error;
    }
};

export const fetchCategoriesByName = async (name) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/categories/search?phraseInName=${name}`);
        const categories = response.data;
        return categories.map(cat => ({
            id: cat.category.id,
            name: cat.category.name
        }));
    } catch (error) {
        errorToast(error);
        console.error('Error fetching subcategories:', error);
        throw error;
    }
};

