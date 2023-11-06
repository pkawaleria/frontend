import auctionMsApi from './auctionMsApi';


export const searchCities = async (name) => {
    try {
        const response = await auctionMsApi.get(`/cities/search?searchCityName=${name}`);
        return response.data.cities;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};
