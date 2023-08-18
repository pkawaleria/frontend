import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { exampleAd } from './utils/FullAuctionInfoInput';

export default function FullAuctionInfo() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? exampleAd.images.length - 1 : prevIndex - 1
        );
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === exampleAd.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const togglePhoneNumber = () => {
        setShowPhoneNumber((prevValue) => !prevValue);
    };

    return (
        <div className="flex items-center justify-center gradient-bg-color-only pt-[2.5vh] px-2 h-[80%] w-full">
            <div className="flex flex-col md:flex-row w-[70%] max-w-screen-xl bg-white rounded-lg shadow-md p-6 space-y-6 md:space-y-0 md:space-x-6 mr-2 self-start mw-480:p-4">
                {/* COLUMN 1 */}
                <div className="bg-white rounded-lg shadow-md md:w-2/3 mb-10">
                    <div className="flex">
                        <button
                            className="flex-none bg-gray-100 hover:bg-gray-200 p-2"
                            onClick={goToPreviousImage}>
                            <FaChevronLeft className="text-[1.5vw]"/>
                        </button>
                        <div className="flex-grow flex items-center justify-center">
                            <img
                                src={exampleAd.images[currentImageIndex]}
                                alt={`${currentImageIndex}`}
                                className="w-[10vw]"
                            />
                        </div>
                        <button
                            className="flex-none bg-gray-100 hover:bg-gray-200 p-2"
                            onClick={goToNextImage}>
                            <FaChevronRight className="text-[1.5vw]" />
                        </button>
                    </div>
                    <div className="flex justify-center mt-5 mb-2 space-x-2">
                        {exampleAd.images.map((image, index) => (
                            <div
                                key={index}
                                className={`w-[1.2vw] h-[1.2vw] bg-gray-300 rounded-md cursor-pointer transform hover:scale-125 transition-transform ${index === currentImageIndex ? 'bg-gray-500' : ''
                                    }`}
                                onClick={() => handleThumbnailClick(index)}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 md:w-1/3">
                    <h2 className="text-[2.2vw] font-semibold mb-2">{exampleAd.title}</h2>
                    <p className="text-[1.8vw] font-medium mb-10">{exampleAd.price}</p>
                    <p className="text-[1.6vw] font-medium mb-5">Opis</p>
                    <p className="text-[1.3vw] text-gray-600">{exampleAd.description}</p>
                </div>
            </div>
            {/* COLUMN 2 */}
            <div className="flex flex-col w-[20%] max-w-screen-md bg-white rounded-lg shadow-md p-4 space-y-4 self-start">
                <div className="bg-white rounded-lg shadow-md p-[1vw]">
                    <h3 className="text-[1.2vw] font-semibold mb-2">Dane użytkownika</h3>
                    <p className="mb-1 text-[1vw]">Nazwa użytkownika: {exampleAd.user.name}</p>
                    {showPhoneNumber ? (
                        <p className="mb-1 text-[1vw]">Numer telefonu: {exampleAd.user.phoneNumber}</p>
                    ) : (
                        <button
                            onClick={togglePhoneNumber}
                            className="bg-blue-500 text-white py-[0.5vw] px-[1vw] rounded-md mt-2 hover:bg-blue-600 text-[1vw] mr-1"
                        >
                            Pokaż numer
                        </button>
                    )}
                    <button className="bg-blue-500 text-white py-[0.5vw] px-[1vw] rounded-md mt-2 hover:bg-blue-600 text-[1vw]">
                        Wyślij wiadomość
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md">
                    <p className="text-[1vw] font-semibold m-4">Województwo: {exampleAd.province}</p>
                </div>
            </div>
        </div>
    );
}
