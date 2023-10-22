import auctionMsApi from './auctionMsApi';

export const fetchTopLevelCategories = async () => {
    try {
        const response = await auctionMsApi.get('/auction-service/categories/entrypoints');
        return response.data;
    } catch (error) {
        console.error('Error fetching top level categories:', error);
        throw error;
    }
};

export const fetchCategoryDetails = async (id) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category details:', error);
        throw error;
    }
};

export const fetchSubcategories = async (id) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/categories/${id}/subcategories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        throw error;
    }
};