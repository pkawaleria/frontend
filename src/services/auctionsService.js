import auctionMsApi from './auctionMsApi';


export const createAuction = async (payload) => {
    try {
        const response = await auctionMsApi.post(`/auction-service/auctions`, payload);
        return response.data;
    } catch (error) {
        console.error("Error adding new auction", error);
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
    } catch (error) {
        console.error("Error deleting auction:", error);
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
        return response.data;
    } catch (error) {
        console.error("Error adding images to auction", error);
        throw error;
    }
};

export const fetchAllAuctions = async (pageNumber, pageSize) => {
    try {
        const response = await auctionMsApi.get(`/auction-service/auctions/search?page=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
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