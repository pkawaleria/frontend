import auctionMsApi from './auctionMsApi';
import {errorToast} from "./toastService";


export const searchCities = async (name) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/cities/search?searchCityName=${name}`);
        return response.data.cities;
    } catch (error) {
        errorToast(error);
        console.error('Error fetching cities:', error);
        throw error;
    }
};
