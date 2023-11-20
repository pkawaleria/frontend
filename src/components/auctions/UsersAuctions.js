import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsXCircle } from "react-icons/bs";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import axios from "axios";
import { deleteAuction } from "../../services/auctionsService";

export default function UsersAuctions() {
    const token = localStorage.getItem("accessToken");

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAdId, setSelectedAdId] = useState(null);
    const [auctionsData, setAuctionsData] = useState([]);
    const [activeTab, setActiveTab] = useState("active-auctions");

    const openDeleteModal = (adId) => {
        setSelectedAdId(adId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedAdId(null);
        setIsDeleteModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            await deleteAuction(selectedAdId, token);
            window.location = "/twoje-ogloszenia";
            closeDeleteModal();
        } catch (error) {
            console.log("Error during auction process:", error);
        }
    };

    const fetchData = async (status) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_AUCTIONS_MS_ACTIVE_AUCTIONEER_URL}/${status}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setAuctionsData(response.data.auctions);
        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania danych aukcji:", error);
        }
    };

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab, token]);

    return (
        <div>
            <nav className="flex flex-col items-center justify-center w-[50%] bg-blue-500 text-white p-4 rounded-t-lg mx-auto">
                <Link to="/nowe-ogloszenie" className="text-xl font-semibold hover:underline">
                    Dodaj ogłoszenie
                </Link>
                <div className="flex mt-4 space-x-4">
                    {/* Przyciski do zmiany statusu */}
                    <button
                        className={`${
                            activeTab === "active-auctions" ? "bg-blue-600" : "bg-blue-500"
                        } hover:bg-blue-700 text-white px-4 py-2 rounded-md`}
                        onClick={() => {
                            setActiveTab("active-auctions");
                            fetchData("active-auctions");
                        }}
                    >
                        Aktywne
                    </button>
                    <button
                        className={`${
                            activeTab === "awaiting-auctions" ? "bg-blue-600" : "bg-blue-500"
                        } hover:bg-blue-700 text-white px-4 py-2 rounded-md`}
                        onClick={() => {
                            setActiveTab("awaiting-auctions");
                            fetchData("awaiting-auctions");
                        }}
                    >
                        Oczekujące
                    </button>
                    <button
                        className={`${
                            activeTab === "expired-auctions" ? "bg-blue-600" : "bg-blue-500"
                        } hover:bg-blue-700 text-white px-4 py-2 rounded-md`}
                        onClick={() => {
                            setActiveTab("expired-auctions");
                            fetchData("expired-auctions");
                        }}
                    >
                        Zakończone
                    </button>
                    <button
                        className={`${
                            activeTab === "archived-auctions" ? "bg-blue-600" : "bg-blue-500"
                        } hover:bg-blue-700 text-white px-4 py-2 rounded-md`}
                        onClick={() => {
                            setActiveTab("archived-auctions");
                            fetchData("archived-auctions");
                        }}
                    >
                        Zarchiwizowane
                    </button>
                    <button
                        className={`${
                            activeTab === "rejected-auctions" ? "bg-blue-600" : "bg-blue-500"
                        } hover:bg-blue-700 text-white px-4 py-2 rounded-md`}
                        onClick={() => {
                            setActiveTab("rejected-auctions");
                            fetchData("rejected-auctions");
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
                            key={ad.id}
                        >
                            <div className="bg-white border rounded-lg shadow-md p-4 flex justify-between">
                                <div className="flex items-center">
                                    <img src={`data:image/jpeg;base64,${ad.thumbnail}`} alt={ad.name} className="w-200 h-200 object-cover" />
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold mb-2">{ad.name}</h3>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <BiCategoryAlt size={20} />
                                            <p className="text-gray-600 mb-2">{ad.category.name}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <FaMapMarkerAlt size={18} />
                                            <p className="text-gray-600">{ad.cityName}</p>
                                        </div>
                                        {/* TODO ZWRACANIE DATY KOŃCOWEJ */}
                                        {/* <div className="flex items-center space-x-2 mb-2">
                                            <FaRegCalendarAlt size={18} />
                                            <p className="text-gray-600">
                                                {ad.startDate} - {ad.endDate}
                                            </p>
                                        </div> */}
                                        <p className="text-lg font-semibold mb-2">{ad.price}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                <span className="text-gray-600">ID: {ad.id}</span>
                                    <div className=" space-x-2">
                                        <Link
                                            className="text-blue-400 hover:text-blue-700"
                                            to="/edytuj-ogloszenie"
                                            data-tooltip-id="editAdTooltip"
                                            data-tooltip-content="Edytuj ogłoszenie"
                                        >
                                            <BsPencilSquare size={20} />
                                            <Tooltip id="editAdTooltip" type="dark" effect="solid" delayShow={200} delayHide={100} />
                                        </Link>
                                        <Link
                                            onClick={() => openDeleteModal(ad.id)}
                                            className="text-red-300 hover:text-red-700"
                                            data-tooltip-id="deleteAdTooltip"
                                            data-tooltip-content="Usuń ogłoszenie"
                                        >
                                            <BsXCircle size={20} />
                                            <Tooltip id="deleteAdTooltip" type="dark" effect="solid" delayShow={200} delayHide={100} />
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
                        <div className="relative bg-white w-1/2 rounded-lg shadow-md p-8 opacity-100">
                            <p className="text-lg font-semibold mb-4 text-center">Czy na pewno chcesz usunąć ogłoszenie?</p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md"
                                    onClick={handleDelete}>
                                    Usuń
                                </button>
                                <button
                                    className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md"
                                    onClick={closeDeleteModal}
                                >
                                    Anuluj
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {auctionsData.length > 5 && (
                    <Link to="/nowe-ogloszenie" className="text-xl font-semibold hover:underline">
                        Dodaj ogłoszenie
                    </Link>
                )}
        </div>
    );
}
