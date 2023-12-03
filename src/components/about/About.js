import React from "react";
import { FaSearch, FaComment, FaAd, FaUserShield, FaShoppingCart, FaShieldAlt } from "react-icons/fa";

export default function About() {
    return (
        <div className="gradient-bg-color-only mt-8">
            <div className="bg-white dark:bg-neutral-900/25 dark:border-2 dark:border-neutral-100 border-2 border-blue-500 rounded-lg max-w-6xl mx-auto py-8 px-6 sm:px-12 my-4">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-neutral-100 mb-6">O Nas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Sekcja 1 */}
                    <div className="bg-white dark:bg-neutral-700 border-blue-500 dark:border-neutral-100 rounded-lg shadow-lg p-6 hover:scale-105 hover:cursor-pointer border-2 ease-linear duration-100 transition-all">
                        <div className="flex items-center mb-4">
                            <FaSearch className="text-4xl text-blue-500 dark:text-neutral-200 mr-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-neutral-100">Wyszukuj Ogłoszenia</h3>
                        </div>
                        <p className="text-gray-600 dark:text-neutral-200">
                            Nasz serwis oferuje Ci możliwość przeszukiwania ogłoszeń w różnych kategoriach. Znajdź
                            interesujące Cię produkty i usługi w prosty i wygodny sposób.
                        </p>
                    </div>

                    {/* Sekcja 2 */}
                    <div className="bg-white dark:bg-neutral-700 border-blue-500 dark:border-neutral-100 rounded-lg shadow-lg p-6 hover:scale-105 hover:cursor-pointer border-2 ease-linear duration-100 transition-all">
                        <div className="flex items-center mb-4">
                            <FaComment className="text-4xl text-blue-500 dark:text-neutral-200 mr-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-neutral-100">Komunikuj się</h3>
                        </div>
                        <p className="text-gray-600 dark:text-neutral-200">
                            Za pośrednictwem naszego serwisu możesz bezpośrednio komunikować się z innymi
                            użytkownikami. Dzięki opcji wiadomości możesz negocjować, zadawać pytania i nawiązywać
                            kontakty.
                        </p>
                    </div>

                    {/* Sekcja 3 */}
                    <div className="bg-white dark:bg-neutral-700 border-blue-500 dark:border-neutral-100 rounded-lg shadow-lg p-6 hover:scale-105 hover:cursor-pointer border-2 ease-linear duration-100 transition-all">
                        <div className="flex items-center mb-4">
                            <FaAd className="text-4xl text-blue-500 dark:text-neutral-200 mr-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-neutral-100">Zarządzaj Ogłoszeniami</h3>
                        </div>
                        <p className="text-gray-600 dark:text-neutral-200">
                            Dodawaj, edytuj i usuwaj swoje ogłoszenia w dowolnym momencie. Nasza platforma
                            umożliwia elastyczne zarządzanie Twoimi ofertami.
                        </p>
                    </div>

                    {/* Sekcja 4 */}
                    <div className="bg-white dark:bg-neutral-700 border-blue-500 dark:border-neutral-100 rounded-lg shadow-lg p-6 hover:scale-105 hover:cursor-pointer border-2 ease-linear duration-100 transition-all">
                        <div className="flex items-center mb-4">
                            <FaUserShield className="text-4xl text-blue-500 dark:text-neutral-200 mr-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-neutral-100">Moderowane Ogłoszenia</h3>
                        </div>
                        <p className="text-gray-600 dark:text-neutral-200">
                            Dbamy o jakość ogłoszeń na naszej platformie. Wszystkie oferty przechodzą proces
                            moderacji, co gwarantuje bezpieczne i godne zaufania transakcje.
                        </p>
                    </div>

                    {/* Sekcja 5 */}
                    <div className="bg-white dark:bg-neutral-700 border-blue-500 dark:border-neutral-100 rounded-lg shadow-lg p-6 hover:scale-105 hover:cursor-pointer border-2 ease-linear duration-100 transition-all">
                        <div className="flex items-center mb-4">
                            <FaShoppingCart className="text-4xl text-blue-500 dark:text-neutral-200 mr-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-neutral-100">Dostęp do Wielu Ofert</h3>
                        </div>
                        <p className="text-gray-600 dark:text-neutral-200">
                            Nasza platforma oferuje ogromny wybór ogłoszeń w różnych kategoriach. Znajdziesz tu
                            produkty i usługi dostosowane do Twoich potrzeb.
                        </p>
                    </div>

                    {/* Sekcja 6 */}
                    <div className="bg-white dark:bg-neutral-700 border-blue-500 dark:border-neutral-100 rounded-lg shadow-lg p-6 hover:scale-105 hover:cursor-pointer border-2 ease-linear duration-100 transition-all">
                        <div className="flex items-center mb-4">
                            <FaShieldAlt className="text-4xl text-blue-500 dark:text-neutral-200 mr-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-neutral-100">Szybkie i Bezpieczne Zakupy</h3>
                        </div>
                        <p className="text-gray-600 dark:text-neutral-200">
                            Zakupy na naszej platformie są szybkie i bezpieczne. Gwarantujemy, że Twoje dane są
                            chronione, a transakcje są bezpieczne i godne zaufania.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
