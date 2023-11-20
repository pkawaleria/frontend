import accountMsApi from "./accountMsApi";

export const getUserShortInfo = async (auctioneerId) => {
    try {
        const response = await accountMsApi.get(`/users/account_info_short/${auctioneerId}`);
        return response.data;
    } catch (error) {
        console.error("Error adding new auction", error);
        throw error;
    }
}