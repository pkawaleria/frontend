import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from 'react-icons/fa'
import { BiCategoryAlt } from 'react-icons/bi'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useFontSize } from "../fontSize/FontSizeContext";

export default function OtherUsersAuction() {
    const { id } = useParams();
    const { isFontLarge } = useFontSize();
    const [auctionsData, setAuctionsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/auction-service/users/${id}/auctions`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setAuctionsData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania danych aukcji:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatPrice = (price) => {
        const parts = price.toFixed(2).toString().split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const decimalPart = parts[1] === '00' ? '' : `.${parts[1]}`;
        const formattedPrice = `${integerPart}${decimalPart} zł`;

        return formattedPrice;
    };


    if (loading) {
        return (
            <div className="text-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center gradient-bg-color-only p-6 mt-2">
            <div className="grid grid-cols-1 gap-6 w-2/3">
                {auctionsData.length > 0 ? (
                    auctionsData.map((ad) => (
                        <Link
                            to={`/ogloszenie/${ad.id}`}
                            key={ad.id}
                            className="overflow-hidden bg-white dark:bg-neutral-900 dark:text-neutral-100 border rounded-lg shadow-md p-4 flex justify-between hover:bg-neutral-300 dark:hover:bg-neutral-800 duration-100 ease-linear">
                            <div className="flex items-center">
                                <img src={`data:image/jpeg;base64,${ad.thumbnail}`} alt={ad.name} className="object-cover" />
                                <div className="ml-4">
                                    <p className={`${isFontLarge ? "text-3xl" : "text-xl"} font-semibold mb-2`}>{ad.name}</p>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <BiCategoryAlt size={20} />
                                        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} text-gray-600 dark:text-neutral-400 mb-2`}>{ad.category.name}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FaMapMarkerAlt size={18} />
                                        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} text-gray-600 dark:text-neutral-400`}>{ad.cityName}</p>
                                    </div>
                                    {/* TODO ZWRACANIE DATY KOŃCOWEJ */}
                                    {/* <div className="flex items-center space-x-2 mb-2">
                                            <FaRegCalendarAlt size={18} />
                                            <p className="text-gray-600">
                                                {ad.startDate} - {ad.endDate}
                                            </p>
                                        </div> */}
                                    <p className={`${isFontLarge ? "text-2xl" : "text-lg"} font-semibold mb-2`}>{formatPrice(ad.price)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className={`${isFontLarge ? "text-xl" : "text-lg"} text-gray-600 dark:text-neutral-400`}>ID: {ad.id}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Brak dostępnych aukcji.</p> // Wyświetl komunikat, jeśli nie ma dostępnych aukcji
                )}
            </div>
        </div>
    );
}
