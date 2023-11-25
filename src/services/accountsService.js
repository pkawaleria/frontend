import accountMsApi from "./accountMsApi";

export const getUserShortInfo = async (auctioneerId) => {
    try {
        const response = await accountMsApi.get(`/users/account_info_short/${auctioneerId}`);
        return response.data;
    } catch (error) {
        console.error("Error accessing user short info", error);
        throw error;
    }
}

export const getUserFullInfo = async (token) => {
    try {
        const response = await accountMsApi.get(`/users/account_info`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error accessing user full info", error);
        throw error;
    }
}

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