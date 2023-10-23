import axios from 'axios';

const auctionMsApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {'Content-Type': 'application/json'}
});

// Mapa kodów błędów
const errorCodes = {
    "AUCT01": "Niepoprawne dane aukcji",
};

auctionMsApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

auctionMsApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status >= 500) {
            return Promise.reject("Problem z połączeniem z serwerem");
        }
        if (error.response.status === 401) {
            // token expired
            if (localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
            }
            return Promise.reject('Niepoprawne dane uwierzytelniające');
        }
        if (error.response.status === 403) {
            return Promise.reject('Nie jesteś uprawniony do wykonania tej operacji');
        }
        if (error.response.data && error.response.data.code) {
            return Promise.reject(errorCodes[error.response.data.code] || error.response.data.message);
        }
        return Promise.reject(`Wystąpił niezidentyfikowany błąd. Status: ${error.response.status}`);
    }
);

export default auctionMsApi;