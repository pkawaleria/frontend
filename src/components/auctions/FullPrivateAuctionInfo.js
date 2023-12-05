import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsXCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import "react-image-lightbox/style.css";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import axios from "axios";
import { formatToUrlOption } from '../../services/formattingUtils';
import { useFontSize } from "../fontSize/FontSizeContext"

import {
    canDeleteAuctions,
    isSuperAdmin,
} from "../admins/utils/PermissionsCheck";
import {
    fetchPrivateAuctionInfo,
    getAuctionImage,
    getAuctionImages,
} from "../../services/auctionsService";
import { getUserShortInfo } from "../../services/userService";

import "../../assets/styles/imageGallery/style.css";
import Lightbox from "react-image-lightbox";
import LoadingSpinner from "../spinner/LoadingSpinner";

export default function FullPrivateAuctionInfo() {
    const navigate = useNavigate();
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const { id } = useParams();
    const [auctionInfo, setAuctionInfo] = useState(null);
    const [auctionImages, setAuctionImages] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [emailTitle, setEmailTitle] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentMainCategory, setCurrentMainCategory] = useState(null);

    const { isFontLarge } = useFontSize();

    useEffect(() => {
        handleFetchUserAndAuctionInfo();
    }, []);

    const togglePhoneNumber = () => {
        setShowPhoneNumber((prevValue) => !prevValue);
    };

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = phoneNumber.replace(/\D/g, '');

        if (cleaned && cleaned.length >= 9) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
        } else {
            return phoneNumber;
        }
    };

    const deleteAuction = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            await deleteAuction(auctionInfo.id, token);
            window.location = "/";
        } catch (error) {
            console.log("Error during auction process:", error);
        }
    };

    const handleFetchUserAndAuctionInfo = async () => {
        try {
            const responseAuctionInfo = await fetchPrivateAuctionInfo(id);
            setAuctionInfo(responseAuctionInfo);
            setCurrentCategory(responseAuctionInfo.category)
            setCurrentMainCategory(responseAuctionInfo.categoryPath.pathElements[0])

            try {
                const auctioneerInfoResponse = await getUserShortInfo(
                    responseAuctionInfo.auctioneerId
                );
                setUserData(auctioneerInfoResponse);
            } catch (error) {
                setUserData({}); //TODO: temp workaround
            }

            const auctionImagesResponse = await getAuctionImages(id);

            const images = await Promise.all(
                auctionImagesResponse.map(async (imageId) => {
                    const imageByteArray = await getAuctionImage(id, imageId);
                    return URL.createObjectURL(imageByteArray);
                })
            );

            setAuctionImages(images);
            setPhotoIndex(0);
            setLoading(false);
        } catch (error) {
            console.error(
                "Wystąpił błąd podczas pobierania danych ogłoszenia:",
                error
            );
        }
    };

    const handleConfirmation = async () => {
        try {
            await axios.post(
                process.env.REACT_APP_ACCOUNTING_MS_USERS_SEND_MAIL,
                {
                    id: userData.id,
                    subject: emailTitle,
                    message: emailMessage,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
        } catch (error) {
            console.error("Wystąpił błąd:", error);
        }
        setIsConfirmationModalOpen(false);
    };

    const sendMail = async () => {
        setIsConfirmationModalOpen(true);
    };

    const formatPrice = (price) => {
        const parts = price.toFixed(2).toString().split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const decimalPart = parts[1] === '00' ? '' : `.${parts[1]}`;
        const formattedPrice = `${integerPart}${decimalPart} zł`;

        return formattedPrice;
    };

    function navigateToAuctions(name, id) {
        let category = formatToUrlOption(name, id);
        navigate(`/aukcje/szukaj/?selectedCategory=${category}`);
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex items-center justify-center gradient-bg-color-only pt-[2.5vh] px-2 min-h-[80vh] w-full">
            {/* COLUMN 1 */}
            <div className="mt-3 mb-5 flex flex-col md:flex-row w-[70%] max-w-screen-xl bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 space-y-6 md:space-y-0 md:space-x-6 mr-2 self-start mw-480:p-4">
                <div className="bg-white dark:bg-neutral-700/20  p-3 rounded-lg shadow-md md:w-2/3 text-black dark:text-neutral-100 text-[1.5vw] font-semibold">
                    {auctionInfo.categoryPath.pathElements.length > 0 ? (
                        <>
                            <button
                                className={`${isFontLarge ? "text-4xl" : "text-2xl"} hover:text-gray-600 dark:hover:text-neutral-400 ease-linear duration-100`}
                                onClick={() => {
                                    navigateToAuctions(currentMainCategory.name, currentMainCategory.id);
                                }}>
                                {auctionInfo.categoryPath.pathElements[0].name}
                            </button>

                            {auctionInfo.categoryPath.pathElements.length > 2 ? (
                                <>
                                    <span>{' / ... / '}</span>
                                    <button
                                        className={`${isFontLarge ? "text-4xl" : "text-2xl"} hover:text-gray-600 dark:hover:text-neutral-400 ease-linear duration-100`}
                                        onClick={() => {
                                            navigateToAuctions(currentCategory.name, currentCategory.id);
                                        }}>
                                        {auctionInfo.categoryPath.pathElements[auctionInfo.categoryPath.pathElements.length - 1].name}
                                    </button>
                                </>
                            ) : auctionInfo.categoryPath.pathElements.length > 1 ? (
                                <>
                                    <span className={`${isFontLarge ? "text-4xl" : "text-2xl"}`}>{' / '}</span>
                                    <button
                                        className={`${isFontLarge ? "text-4xl" : "text-2xl"} hover:text-gray-600 dark:hover:text-neutral-400 ease-linear duration-100`}
                                        onClick={() => {
                                            navigateToAuctions(currentCategory.name, currentCategory.id);
                                        }}>
                                        {auctionInfo.categoryPath.pathElements[1].name}
                                    </button>
                                </>
                            ) : ''}
                        </>
                    ) : ''}
                </div>
                {auctionImages.length !== 0 && (
                    <div className="bg-white dark:bg-neutral-700/20 rounded-lg shadow-md md:w-2/3 mb-10">
                        <div className="image-container">
                            <img
                                src={auctionImages[photoIndex]}
                                alt={`Auction ${photoIndex}`}
                                onClick={() => setIsLightboxOpen(true)} />
                            <div className="magnifier-icon">
                                <FaSearch onClick={() => setIsLightboxOpen(true)} />
                            </div>
                            <div
                                className="navigation-button left dark:bg-neutral-600"
                                onClick={() =>
                                    setPhotoIndex(
                                        (photoIndex + auctionImages.length - 1) %
                                        auctionImages.length
                                    )
                                }>
                                <FaArrowLeft />
                            </div>
                            <div
                                className="navigation-button right dark:bg-neutral-600"
                                onClick={() =>
                                    setPhotoIndex((photoIndex + 1) % auctionImages.length)
                                }>
                                <FaArrowRight />
                            </div>
                            <div className="image-caption">
                                Zdjęcie {photoIndex + 1} z {auctionImages.length}
                            </div>
                        </div>
                        {isLightboxOpen && (
                            <Lightbox
                                mainSrc={auctionImages[photoIndex]}
                                nextSrc={
                                    auctionImages[(photoIndex + 1) % auctionImages.length]
                                }
                                prevSrc={
                                    auctionImages[
                                    (photoIndex + auctionImages.length - 1) %
                                    auctionImages.length
                                    ]
                                }
                                onCloseRequest={() => setIsLightboxOpen(false)}
                                onMovePrevRequest={() =>
                                    setPhotoIndex(
                                        (photoIndex + auctionImages.length - 1) %
                                        auctionImages.length
                                    )
                                }
                                onMoveNextRequest={() =>
                                    setPhotoIndex((photoIndex + 1) % auctionImages.length)
                                }
                            />
                        )}
                    </div>
                )}
                <div className="bg-white dark:bg-neutral-700/20 rounded-lg shadow-md p-4 md:w-1/3 dark:text-neutral-100">
                    <p className={`${isFontLarge ? "text-[3vw]" : "text-[2.2vw]"} font-normal mb-5`}>
                        {auctionInfo.name}
                    </p>
                    <p className={`${isFontLarge ? "text-[2.1vw]" : "text-[1.8vw]"} font-semibold mb-10`}>
                        {formatPrice(auctionInfo.price)}
                    </p>
                    <p className={`${isFontLarge ? "text-[1.4vw]" : "text-[1.25vw]"} text-gray-600 dark:text-neutral-400 break-words`}>
                        {auctionInfo.description}
                    </p>
                    <hr className="border-0 h-[1px] my-3 bg-slate-500 font-bold" />
                    <div className="flex">
                        <p className={`${isFontLarge ? "text-[1.5vw]" : "text-[1vw]"} w-[50%] text-left`}>ID: {auctionInfo.id}</p>
                        <p className={`${isFontLarge ? "text-[1.5vw]" : "text-[1vw]"} w-[50%] text-right`}>
                            Wyświetlenia: {auctionInfo.viewCount}
                        </p>
                    </div>
                </div>
            </div>

            {/* COLUMN 2 */}
            <div
                className="mt-3 flex flex-col w-[20%] max-w-screen-md bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 space-y-4 self-start">
                <div className="bg-white dark:bg-neutral-700/20 rounded-lg shadow-md p-[1vw] grid">
                    <p className={`${isFontLarge ? "text-[1.8vw]" : "text-[1.2vw]"} font-semibold text-center dark:text-neutral-200`}>Dane użytkownika</p>
                    <Link
                        to={`/ogloszenia-uzytkownika/${userData.id}`}
                        className={`bg-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-500 
                        text-white text-center py-[0.5vw] px-[1vw] mt-2 rounded-md 
                        hover:bg-blue-600 ease-linear duration-100 
                        ${isFontLarge ? "text-[1.3vw]" : "text-[1vw]"}`}>
                        Sprzedający: {userData.username}
                    </Link>
                    {showPhoneNumber ? (
                        <p className={`mb-1 ${isFontLarge ? "text-[1.4vw]" : "text-[1vw]"} text-center mt-5 dark:text-neutral-200`}>
                            Numer telefonu: {formatPhoneNumber(auctionInfo.phoneNumber)}
                        </p>
                    ) : (
                        <button
                            onClick={togglePhoneNumber}
                            className={`bg-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-500 
                            text-white py-[0.5vw] px-[1vw] rounded-md mt-2 
                            hover:bg-blue-600 mr-1 ease-linear duration-100
                            ${isFontLarge ? "text-[1.3vw]" : "text-[1vw]"}`}>
                            Pokaż numer
                        </button>
                    )}
                    {localStorage.getItem("accessToken") &&
                        <button className={`bg-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-500 
                        text-white py-[0.5vw] px-[1vw] rounded-md mt-2
                        hover:bg-blue-600 ease-linear duration-100
                        ${isFontLarge ? "text-[1.3vw]" : "text-[1vw]"}`}
                            onClick={sendMail}>
                            Wyślij wiadomość
                        </button>
                    }
                </div>
                <div className="bg-white dark:bg-neutral-700/20 rounded-lg shadow-md dark:text-neutral-200">
                    <p className={`${isFontLarge ? "text-[1.3vw]" : "text-[1vw]"} font-semibold m-4`}>
                        Województwo: {auctionInfo.province.charAt(0).toUpperCase() + auctionInfo.province.slice(1)}
                    </p>
                    <p className={`${isFontLarge ? "text-[1.3vw]" : "text-[1vw]"} font-semibold m-4`}>
                        Miejscowość: {auctionInfo.cityName}
                    </p>
                </div>
                {(isSuperAdmin() || canDeleteAuctions()) && (
                    <div className="bg-white dark:bg-neutral-700/20 rounded-lg shadow-md p-[1vw]">
                        <Link
                            data-tooltip-id="deleteAd"
                            data-tooltip-content="Usuń ogłoszenie"
                            onClick={deleteAuction}>
                            <Tooltip
                                id="deleteAd"
                                type="dark"
                                effect="solid"
                                delayShow={200}
                                delayHide={100}
                            />
                            <BsXCircle size={20} z={100} className="text-red-400 hover:text-red-600 ease-linear duration-100" />
                        </Link>
                    </div>
                )}
                {isConfirmationModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white dark:bg-neutral-700 w-1/2 rounded-lg shadow-md p-8 opacity-100">
                            <p className="text-lg font-semibold mb-4 text-center dark:text-neutral-300">
                                Wyślij wiadomość do użytkownika
                            </p>
                            <div className="mb-4">
                                <label
                                    htmlFor="emailTitle"
                                    className="block text-gray-600 dark:text-neutral-400 font-medium mb-2">
                                    Tytuł:
                                </label>
                                <input
                                    type="text"
                                    id="emailTitle"
                                    name="emailTitle"
                                    value={emailTitle}
                                    onChange={(e) => setEmailTitle(e.target.value)}
                                    className="w-full p-2 border dark:text-neutral-300 border-blue-500 dark:bg-neutral-500 dark:border-neutral-200 rounded-md focus:outline-none"
                                    required />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="emailMessage"
                                    className="block text-gray-600 dark:text-neutral-400 font-medium mb-2">
                                    Wiadomość:
                                </label>
                                <textarea
                                    id="emailMessage"
                                    name="emailMessage"
                                    value={emailMessage}
                                    onChange={(e) => setEmailMessage(e.target.value)}
                                    rows="4"
                                    className="w-full p-2 border dark:text-neutral-300 border-blue-500 dark:bg-neutral-500 dark:border-neutral-200 rounded-md focus:outline-none"
                                    required />
                            </div>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="text-white bg-green-500 hover:bg-green-700 dark:bg-green-900 dark:hover:bg-green-700 ease-linear duration-100 py-2 px-4 rounded-md"
                                    onClick={handleConfirmation}>
                                    Tak
                                </button>
                                <button
                                    className="text-white bg-blue-500 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-700 py-2 px-4 rounded-md"
                                    onClick={() => setIsConfirmationModalOpen(false)}>
                                    Anuluj
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
