import auctionMsApi from './auctionMsApi';

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