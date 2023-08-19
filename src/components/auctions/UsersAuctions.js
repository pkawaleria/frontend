import React, { useState } from "react";
import { adsData } from './utils/UsersAuctionsInput'
import { BsPencilSquare, BsXCircle } from 'react-icons/bs'
import { FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { BiCategoryAlt } from 'react-icons/bi'
import { Tooltip } from 'react-tooltip';
import { Link } from "react-router-dom"

export default function UsersAuctions() {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAdId, setSelectedAdId] = useState(null);

    const openDeleteModal = (adId) => {
        setSelectedAdId(adId);
        setIsDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setSelectedAdId(null);
        setIsDeleteModalOpen(false);
    }

    const handleDelete = () => {
        //Logika usuwania
        closeDeleteModal();
    }

    return (
        <div className="flex items-center justify-center gradient-bg-color-only p-6 mt-5">
            <div className="grid grid-cols-1 gap-6 w-2/3">
                {adsData.map((ad) => (
                    <div className="hover:scale-110">
                        <div
                            key={ad.id}
                            className="bg-white border rounded-lg shadow-md p-4 flex justify-between"
                        >
                            <div className="flex items-center">
                                <img src={ad.image} alt={ad.title} className="w-200 h-200 object-cover" />
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <BiCategoryAlt size={20} />
                                        <p className="text-gray-600 mb-2">{ad.category}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FaMapMarkerAlt size={18} />
                                        <p className="text-gray-600">{ad.province}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FaRegCalendarAlt size={18} />
                                        <p className="text-gray-600">{ad.startDate} - {ad.endDate}</p>
                                    </div>
                                    <p className="text-lg font-semibold mb-2">{ad.price}</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between">
                                <span className="text-gray-600">ID: {ad.id}</span>
                                <div className="flex space-x-2 mt-4">
                                    <Link className="text-blue-500 hover:text-blue-700" to="/edytuj-ogloszenie" data-tooltip-id='editAdTooltip' data-tooltip-content="Edytuj ogłoszenie">
                                        <BsPencilSquare size={20} />
                                        <Tooltip id="editAdTooltip" type="dark" effect="solid" delayShow={200} delayHide={100} />
                                    </Link>
                                    <Link onClick={() => openDeleteModal(ad.id)} className="text-red-500 hover:text-red-700" data-tooltip-id='deleteAdTooltip' data-tooltip-content="Usuń ogłoszenie">
                                        <BsXCircle size={20} />
                                        <Tooltip id="deleteAdTooltip" type="dark" effect="solid" delayShow={200} delayHide={100} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                onClick={handleDelete}
                            >
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
    );
}
