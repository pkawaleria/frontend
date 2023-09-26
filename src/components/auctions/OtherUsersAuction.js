import React from "react";
import { adsData } from './utils/UsersAuctionsInput'
import { FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { BiCategoryAlt } from 'react-icons/bi'


export default function OtherUsersAuction() {
    return (
        <div className="flex items-center justify-center gradient-bg-color-only p-6 mt-5">
            <div className="grid grid-cols-1 gap-6 w-2/3">
                {adsData.map((ad) => (
                    <div className="hover:scale-[1.01] ease-linear duration-100">
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

                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
