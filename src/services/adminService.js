import accountMsApi from "./accountMsApi";

export const getAdminFullInfo = async (token) => {
    try {
        const response = await accountMsApi.get(`/admin/account_info`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error accessing admin full info", error);
        throw error;
    }
}