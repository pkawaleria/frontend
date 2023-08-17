import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ad } from './utils/FullAuctionInfoInput';

export default function FullAuctionInfo() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? ad.images.length - 1 : prevIndex - 1
        );
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === ad.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const togglePhoneNumber = () => {
        setShowPhoneNumber((prevValue) => !prevValue);
    };

    return (
        <div className="flex items-center justify-center gradient-bg-color-only pt-3 pb-4 px-2">
            <div className="flex flex-col md:flex-row w-[70%] max-w-screen-xl bg-white rounded-lg shadow-md p-6 space-y-6 md:space-y-0 md:space-x-6 mr-2">
                {/* COLUMN 1 */}
                <div className="bg-white rounded-lg shadow-md md:w-2/3 mb-10">
                    <div className="flex">
                        <button
                            className="flex-none bg-gray-100 hover:bg-gray-200 p-2"
                            onClick={goToPreviousImage}
                        >
                            <FaChevronLeft size={20} />
                        </button>
                        <div className="flex-grow flex items-center justify-center">
                            <img
                                src={ad.images[currentImageIndex]}
                                alt={`${currentImageIndex}`}
                                className="object-cover max-h-[300px] w-auto"
                            />
                        </div>
                        <button
                            className="flex-none bg-gray-100 hover:bg-gray-200 p-2"
                            onClick={goToNextImage}
                        >
                            <FaChevronRight size={20} />
                        </button>
                    </div>
                    <div className="flex justify-center mt-5 mb-2 space-x-2">
                        {ad.images.map((image, index) => (
                            <div
                                key={index}
                                className={`w-6 h-6 bg-gray-300 rounded-md cursor-pointer transform hover:scale-125 transition-transform ${index === currentImageIndex ? 'bg-gray-500' : ''
                                    }`}
                                onClick={() => handleThumbnailClick(index)}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 md:w-1/3">
                    <h2 className="text-4xl font-semibold mb-2">{ad.title}</h2>
                    <p className="text-3xl font-medium mb-10">{ad.price}</p>
                    <p className="text-3xl font-medium mb-5">Opis</p>
                    <p className="text-gray-600">{ad.description}</p>
                </div>
            </div>
            {/* COLUMN 2 */}
            <div className="flex flex-col w-[20%] max-w-screen-md bg-white rounded-lg shadow-md p-4 space-y-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-2">Dane użytkownika</h3>
                    <p className="mb-1">Nazwa użytkownika: {ad.user.name}</p>
                    {showPhoneNumber ? (
                        <p className="mb-1">Numer telefonu: {ad.user.phoneNumber}</p>
                    ) : (
                        <button
                            onClick={togglePhoneNumber}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-600"
                        >
                            Pokaż numer
                        </button>
                    )}
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-600">
                        Wyślij wiadomość
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-lg font-semibold">Województwo: {ad.province}</p>
                </div>
            </div>
        </div>
    );
}
