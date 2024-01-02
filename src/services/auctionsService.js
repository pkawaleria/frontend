import auctionMsApi from './auctionMsApi';
import { errorToast, successToast } from "./toastService";

export const createAuction = async (payload) => {
    try {
        const response = await auctionMsApi.post(`/auction-service/auctions`, payload);
        successToast('Pomyślnie utworzono aukcje')
        return response.data;
    } catch (error) {
        console.error("Error adding new auction", error);
        errorToast(error);
        throw error;
    }
};

export const updateAuction = async (auctionId, payload, token) => {
    try {
        await auctionMsApi.put(`/auction-service/auctions/${auctionId}`, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        successToast('Pomyślnie zaktualizowano aukcję')
    } catch (error) {
        errorToast(error);
        console.error("Error updating auction", error);
        throw error;
    }
};

export const deleteAuction = async (auctionId, token) => {
    try {
        await auctionMsApi.delete(`/auction-service/auctions/${auctionId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        successToast('Pomyślnie usunięto aukcje')
    } catch (error) {
        errorToast(error);
        console.error("Error deleting auction:", error);
        throw error;
    }
}

export const getAuctionImages = async (auctionId) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/auctions/${auctionId}/images`);
        return response.data.imageIDs;
    } catch (error) {
        errorToast(error);
        console.error("Error getting auction images", error);
        throw error;
    }
}

export const getAuctionImage = async (auctionId, imageId) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/auctions/${auctionId}/images/${imageId}`, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error(`Error getting image of id ${imageId} for auction:`, error);
        throw error;
    }
}

export const addImagesToAuction = async (auctionId, payload) => {
    try {
        const response = await auctionMsApi.post(`/auction-service/auctions/${auctionId}/images`, payload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        successToast('Dodano obrazy do aukcji')
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error("Error adding images to auction", error);
        throw error;
    }
};

export const fetchAuctionInfo = async (auctionId) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/auctions/${auctionId}`)
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error("Error fetching auction details", error);
        throw error;
    }
}

export const fetchPrivateAuctionInfo = async (auctionId, token) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/active-auctioneer/private/auctions/${auctionId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error("Error fetching private auction details", error);
        throw error;
    }
}

export const fetchUserAuctions = async (status, token) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/active-auctioneer/${status}?pageSize=1000`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error("Error fetching all auctions:", error);
        throw error;
    }
};

export const fetchAllAuctions = async (pageNumber, pageSize) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/auctions/search?page=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error("Error fetching all auctions:", error);
        throw error;
    }
};

export const searchAuctions = async (pageNumber, pageSize, filters) => {
    try {
        const queryParams = createQueryParams(filters);

        queryParams.page = pageNumber;
        queryParams.pageSize = pageSize;

        const response = await auctionMsApi.get('/auction-service/auctions/search', { params: queryParams });
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error("Error searching auctions:", error);
        throw error;
    }
};
export const searchAuctionsWithFullQueryParams = async (pagingAndFilters) => {
    try {
        const queryParams = createQueryParams(pagingAndFilters);
        queryParams.page = pagingAndFilters.pageNumber;
        const response = await auctionMsApi.get('/auction-service/auctions/search', { params: queryParams });
        return response.data;
    } catch (error) {
        errorToast(error);
        console.error("Error searching auctions:", error);
        throw error;
    }
};

const createQueryParams = (filters) => {
    return Object.entries(filters).reduce((acc, [key, value]) => {
        if (value != null && value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {});
};