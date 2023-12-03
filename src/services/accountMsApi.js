import axios from 'axios';
import {errorToast} from "./toastService";

const accountMsApi = axios.create({
    baseURL: process.env.REACT_APP_ACCOUNTING_MS_BASE_URL,
    headers: {'Content-Type': 'application/json'}
});

const errorCodes = {
    'ACC01': 'Nieprawidłowe dane uwierzytelniające',
    'ACC02': 'Hasło i powtórzone hasło nie są zgodne',
    'ACC03': 'Hasło musi mieć co najmniej 8 znaków i zawierać co najmniej jedną wielką literę, jedną małą literę i jedną cyfrę',
    'ACC04': 'Numer telefonu administratora musi mieć dokładnie 9 cyfr',
    'ACC05': 'Administrator o podanym nazwie użytkownika lub adresie e-mail już istnieje',
    'ACC06': 'Wystąpił błąd podczas rejestracji administratora',
    'ACC07': 'Administrator nie znaleziony',
    'ACC08': 'Brak autoryzacji. Upewnij się, że jesteś zalogowany jako administrator',
    'ACC09': 'Użytkownik nie znaleziony',
    'ACC10': 'Zabronione. Tylko administratorzy mają dostęp do tych danych.',
    'ACC11': 'Zabronione. Tylko administratorzy mogą blokować użytkowników.',
    'ACC12': 'Zabronione. Tylko administratorzy mogą odblokowywać użytkowników.',
    'ACC13': 'Nie znaleziono uprawnienia',
    'ACC14': 'Nie można dodać uprawnienia. Administrator już ma to uprawnienie',
    'ACC15': 'Wystąpił nieznany błąd podczas dodawania uprawnienia',
    'ACC16': 'Nie można usunąć uprawnienia. Administrator nie ma tego uprawnienia',
    'ACC17': 'Wystąpił błąd podczas usuwania uprawnienia',
    'ACC18': 'Inicjalizacja uprawnień nie powiodła się',
    'ACC19': 'Uprawnienia nie są puste',
    'ACC20': 'Administrator o tej samej nazwie użytkownika już istnieje',
    'ACC21': 'Administrator o tym samym adresie e-mail już istnieje',
    'ACC22': 'Administrator o tym samym numerze telefonu już istnieje',
    'ACC23': 'Nie podano nowego hasła',
    'ACC24': 'Wystąpił błąd podczas inicjalizacji testowych użytkowników i administratorów',
    'ACC25': 'Zabronione. Tylko administratorzy mają dostęp do tego punktu końcowego',
    'ACC26': 'E-mail musi być wysłany z niepustą wiadomością i z ważnego konta użytkownika',
    'ACC27': 'Token wygasł',
    'ACC28': 'Nieprawidłowy token',
};

accountMsApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});


accountMsApi.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = errorCodes[error.response.data.code] || error.response.data.message || '';

        if (error.response.status >= 500) {
            if (error.response.data && error.response.data.code) {
                errorToast(message);
                return Promise.reject(message);
            }
            errorToast('Problem z połączeniem z serwerem')
            return Promise.reject('Problem z połączeniem z serwerem');
        }
        if (error.response.status === 401) {
            if (localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
            }
            errorToast('Niepoprawne dane uwierzytelniające');
            return Promise.reject('Niepoprawne dane uwierzytelniające');
        }
        if (error.response.status === 403) {
            if (error.response.data && error.response.data.code) {
                errorToast(message);
                return Promise.reject(message);
            }
            errorToast('Nie jesteś uprawniony do wykonania tej operacji')
            return Promise.reject('Nie jesteś uprawniony do wykonania tej operacji');
        }
        if (error.response.data && error.response.data.code) {
            errorToast(message);
            return Promise.reject(message);
        }
        errorToast('Wystąpił niezidentyfikowany błąd.');
        return Promise.reject(`Wystąpił niezidentyfikowany błąd. Status: ${error.response.status}`);
    }
);

export default accountMsApi;