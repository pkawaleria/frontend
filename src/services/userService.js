import accountMsApi from "./accountMsApi";
import {successToast} from "./toastService";

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
        const response = await accountMsApi.get(`/users/account_info`);
        return response.data;
    } catch (error) {
        console.error("Error accessing user full info", error);
        throw error;
    }
}

export const loginUser = async (login, password) => {
    try {
        let requestBody = {email: login, password: password};
        const response = await accountMsApi.post('/users/login',
            requestBody
        );

        const token = response.data.access_token;
        localStorage.setItem("accessToken", token);
        successToast('Zalogowano pomyślnie');
        return true;
    } catch (error) {
        return false;
    }
}

