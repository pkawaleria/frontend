import axios from 'axios';

const auctionMsApi = axios.create({
    baseURL: process.env.REACT_APP_AUCTIONS_MS_BASE_URL,
    headers: {'Content-Type': 'application/json'}
});

// Mapa kodów błędów
const errorCodes = {
    "AUCT01": "Nazwa powinna zawierać tylko znaki alfabetyczne i mieć długość od 1 do 100",
    "AUCT02": "Opis powinien mieć długość od 20 do 500",
    "AUCT03": "Cena powinna być liczbą dodatnią",
    "AUCT04": "Dostępna aukcja nie istnieje",
    "AUCT06": "Nie można wykonać operacji na wygasłej aukcji",
    "AUCT07": "Znaleziono nieodpowiednie treści w nazwie lub opisie aukcji",
    "AUCT08": "Nie można zmienić aukcji, aby przypisać pustą ścieżkę kategorii",
    "AUCT09": "Podany promień do wyszukiwania aukcji według lokalizacji jest poza granicami",
    "AUCT10": "Miasto dla żądań wyszukiwania aukcji nie jest określone lub nie można go znaleźć",
    "AUCT11": "Wykonano nieprawidłową operację na aukcji",

    "CIT01": "Nie znaleziono miasta",
    "CIT02": "Nie można importować miast, znaleziono istniejące miasta",

    "CAT01": "Nie można znaleźć takiej kategorii",
    "CAT02": "Nie można znaleźć kategorii nadrzędnej",
    "CAT03": "Nie można usunąć kategorii najwyższego poziomu (root)",

    "IMG01": "Nie można znaleźć dostępnego obrazu",
    "IMG00_GENERAL": "Walidacja obrazu nie powiodła się",
    "IMG02": "Walidacja obrazu nie powiodła się. Wykryto plik o nieprawidłowym typie zawartości. Powinien być IMAGE_PNG lub IMAGE_JPG",
    "IMG03": "Walidacja obrazu nie powiodła się. Wykryto plik o nieprawidłowym rozszerzeniu. Powinien być jpg, jpeg lub png",
    "IMG04": "Walidacja obrazu nie powiodła się. Wykryto manipulację magicznymi bajtami",
    "IMG05": "Rozmiar obrazu jest zbyt duży. Powinien być mniejszy niż 10 megabajtów",
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
            return Promise.reject("Wystąpił nieoczekiwany problem");
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
        if (error.response.data && error.response.data.errorCodes && error.response.data.errorCodes.length !== 0) {
            const errorDescriptions = error.response.data.errorCodes.map(code => errorCodes[code]).join('\n');
            return Promise.reject(errorDescriptions || "Wystąpił nieoczekiwany problem");
        }
        return Promise.reject(`Wystąpił niezidentyfikowany błąd. Status: ${error.response.status}`);
    }
);

export default auctionMsApi;