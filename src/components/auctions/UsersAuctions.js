import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsXCircle } from "react-icons/bs";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { FaEdit } from 'react-icons/fa';
import { BiCategoryAlt } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { deleteAuction, fetchUserAuctions } from "../../services/auctionsService";

export default function UsersAuctions() {
    const token = localStorage.getItem("accessToken");

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAdId, setSelectedAdId] = useState(null);
    const [auctionsData, setAuctionsData] = useState([]);
    const [activeTab, setActiveTab] = useState("active-auctions");

    useEffect(() => {
        handleFetchUserAuctions(activeTab);
    }, [activeTab, token]);

    const openDeleteModal = (adId) => {
        setSelectedAdId(adId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedAdId(null);
        setIsDeleteModalOpen(false);
    };

    const handleDeleteAuction = async () => {
        try {
            await deleteAuction(selectedAdId, token);
            window.location = "/twoje-ogloszenia";
            closeDeleteModal();
        } catch (error) {
            console.log("Error during auction process:", error);
        }
    };

    const handleFetchUserAuctions = async (status) => {
        try {
            const response = await fetchUserAuctions(status, token);
            setAuctionsData(response.auctions);
        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania danych aukcji:", error);
        }
    };

    const formatPrice = (price) => {
        const parts = price.toFixed(2).toString().split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const decimalPart = parts[1] === '00' ? '' : `.${parts[1]}`;
        const formattedPrice = `${integerPart}${decimalPart} zł`;

        return formattedPrice;
    };

    return (
        <div className="flex flex-col">
            <nav className="flex flex-col items-center justify-center w-[50%] bg-blue-500 dark:bg-neutral-600 text-white p-4 rounded-t-lg mx-auto">
                <Link to="/nowe-ogloszenie" className="text-xl font-semibold hover:underline">
                    Dodaj ogłoszenie
                </Link>
                <div className="flex mt-4 space-x-4">
                    {/* Przyciski do zmiany statusu */}
                    <button
                        className={`${activeTab === "active-auctions" ? "bg-blue-600 dark:bg-neutral-400" : "bg-blue-500 dark:bg-neutral-500"
                            } hover:bg-blue-700 dark:hover:bg-neutral-400 text-white px-4 py-2 rounded-md ease-linear duration-100`}
                        onClick={() => {
                            setActiveTab("active-auctions");
                            handleFetchUserAuctions("active-auctions");
                        }}
                    >
                        Aktywne
                    </button>
                    <button
                        className={`${activeTab === "awaiting-auctions" ? "bg-blue-600 dark:bg-neutral-400" : "bg-blue-500 dark:bg-neutral-500"
                            } hover:bg-blue-700 dark:hover:bg-neutral-400 text-white px-4 py-2 rounded-md ease-linear duration-100`}
                        onClick={() => {
                            setActiveTab("awaiting-auctions");
                            handleFetchUserAuctions("awaiting-auctions");
                        }}
                    >
                        Oczekujące
                    </button>
                    <button
                        className={`${activeTab === "expired-auctions" ? "bg-blue-600 dark:bg-neutral-400" : "bg-blue-500 dark:bg-neutral-500"
                            } hover:bg-blue-700 dark:hover:bg-neutral-400 text-white px-4 py-2 rounded-md ease-linear duration-100`}
                        onClick={() => {
                            setActiveTab("expired-auctions");
                            handleFetchUserAuctions("expired-auctions");
                        }}
                    >
                        Zakończone
                    </button>
                    <button
                        className={`${activeTab === "archived-auctions" ? "bg-blue-600 dark:bg-neutral-400" : "bg-blue-500 dark:bg-neutral-500"
                            } hover:bg-blue-700 dark:hover:bg-neutral-400 text-white px-4 py-2 rounded-md ease-linear duration-100`}
                        onClick={() => {
                            setActiveTab("archived-auctions");
                            handleFetchUserAuctions("archived-auctions");
                        }}
                    >
                        Zarchiwizowane
                    </button>
                    <button
                        className={`${activeTab === "rejected-auctions" ? "bg-blue-600 dark:bg-neutral-400" : "bg-blue-500 dark:bg-neutral-500"
                            } hover:bg-blue-700 dark:hover:bg-neutral-400 text-white px-4 py-2 rounded-md ease-linear duration-100`}
                        onClick={() => {
                            setActiveTab("rejected-auctions");
                            handleFetchUserAuctions("rejected-auctions");
                        }}
                    >
                        Odrzucone
                    </button>
                </div>
            </nav>
            <div className="flex items-center justify-center gradient-bg-color-only p-6 mt-2">
                <div className="grid grid-cols-1 gap-6 w-2/3">
                    {auctionsData.map((ad) => (
                        <Link
                            to={`/ogloszenie/${ad.id}`}
                            className="hover:scale-[1.01] ease-linear duration-100"
                            key={ad.id}>
                            <div className="bg-white dark:bg-neutral-900 dark:text-neutral-100 border rounded-lg shadow-md p-4 flex justify-between">
                                <div className="flex items-center">
                                    <img src={`data:image/jpeg;base64,${ad.thumbnail}`} alt={ad.name} className="w-200 h-200 object-cover" />
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold mb-2">{ad.name}</h3>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <BiCategoryAlt size={20} />
                                            <p className="text-gray-600 dark:text-neutral-300 mb-2">{ad.category.name}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <FaMapMarkerAlt size={18} />
                                            <p className="text-gray-600 dark:text-neutral-300">{ad.cityName}</p>
                                        </div>
                                        {/* TODO ZWRACANIE DATY KOŃCOWEJ */}
                                        {/* <div className="flex items-center space-x-2 mb-2">
                                            <FaRegCalendarAlt size={18} />
                                            <p className="text-gray-600">
                                                {ad.startDate} - {ad.endDate}
                                            </p>
                                        </div> */}
                                        <p className="text-lg font-semibold mb-2">{formatPrice(ad.price)}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-600 dark:text-neutral-300 mb-4">ID: {ad.id}</span>
                                    <div className="flex gap-3">
                                        <Link
                                            to={`/edytuj-ogloszenie/${ad.id}`}
                                            data-tooltip-id="editAdTooltip"
                                            data-tooltip-content="Edytuj ogłoszenie">
                                            <BsPencilSquare className="ease-linear duration-100 text-blue-400 hover:text-blue-700" size={20}/>
                                            <Tooltip
                                                id="editAdTooltip"
                                                type="dark"
                                                effect="solid"
                                                delayShow={50}
                                                delayHide={50} />
                                        </Link>
                                        <Link
                                            onClick={() => openDeleteModal(ad.id)}
                                            data-tooltip-id="deleteAdTooltip"
                                            data-tooltip-content="Usuń ogłoszenie">
                                            <BsXCircle className="ease-linear duration-100 text-red-300 hover:text-red-700" size={20}/>
                                            <Tooltip
                                                id="deleteAdTooltip"
                                                type="dark"
                                                effect="solid"
                                                delayShow={50}
                                                delayHide={50} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {/* Modal */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white dark:bg-neutral-600 w-1/2 rounded-lg shadow-md p-8 opacity-100">
                            <p className="text-lg dark:text-neutral-200 font-semibold mb-4 text-center">Czy na pewno chcesz usunąć ogłoszenie?</p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="text-white bg-red-400 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-700 ease-linear duration-100 py-2 px-4 rounded-md"
                                    onClick={handleDeleteAuction}>
                                    Usuń
                                </button>
                                <button
                                    className="text-white bg-blue-500 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-700 ease-linear duration-100 py-2 px-4 rounded-md"
                                    onClick={closeDeleteModal}>
                                    Anuluj
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {auctionsData.length > 5 && (
                <div className="text-center my-4 text-white dark:text-neutral-50">
                    <Link to="/nowe-ogloszenie" className="text-xl font-semibold hover:underline">
                        Dodaj ogłoszenie
                    </Link>
                </div>
            )}
        </div>
    );
}
