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