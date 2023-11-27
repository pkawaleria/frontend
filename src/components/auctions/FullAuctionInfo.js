import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {BsXCircle} from "react-icons/bs";
import {Tooltip} from "react-tooltip";
import 'react-image-lightbox/style.css';
import {FaArrowLeft, FaArrowRight, FaSearch} from 'react-icons/fa';


import {canDeleteAuctions, isSuperAdmin,} from "../admins/utils/PermissionsCheck";
import {fetchAuctionInfo, getAuctionImage, getAuctionImages} from "../../services/auctionsService";
import {getUserShortInfo} from "../../services/accountsService";

import '../../assets/styles/imageGallery/style.css'
import Lightbox from "react-image-lightbox";
import LoadingSpinner from "../spinner/LoadingSpinner";

export default function FullAuctionInfo() {
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const {id} = useParams();
    const [auctionInfo, setAuctionInfo] = useState(null);
    const [auctionImages, setAuctionImages] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setisAdmin] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

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
            const responseAuctionInfo = await fetchAuctionInfo(id);
            setAuctionInfo(responseAuctionInfo);
            console.log(responseAuctionInfo)

            try {
                const auctioneerInfoResponse = await getUserShortInfo(responseAuctionInfo.auctioneerId);
                setUserData(auctioneerInfoResponse);
            } catch (error) {
                setUserData({}) //TODO: temp workaround
            }


            const auctionImagesResponse = await getAuctionImages(id);


            const images = await Promise.all(
                auctionImagesResponse.map(async (imageId) => {
                    const imageByteArray = await getAuctionImage(id, imageId);
                    return URL.createObjectURL(imageByteArray);
                })
            );

            setAuctionImages(images);
            setPhotoIndex(0)
            setLoading(false);
        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania danych ogłoszenia:", error);
        }
    };


    if (loading) {
        return (<LoadingSpinner/>);
    }

    return (
        <>

            <div
                className="flex items-center justify-center gradient-bg-color-only pt-[2.5vh] px-2 min-h-[80vh] w-full">

                {/* COLUMN 1 */}
                <div
                    className="mt-3 mb-5 flex flex-col md:flex-row w-[70%] max-w-screen-xl bg-white rounded-lg shadow-md p-6 space-y-6 md:space-y-0 md:space-x-6 mr-2 self-start mw-480:p-4">


                    {(auctionImages.length !== 0) && (
                        <div className="bg-white rounded-lg shadow-md md:w-2/3 mb-10">
                            <div className="image-container">
                                <img src={auctionImages[photoIndex]} alt={`Auction ${photoIndex}`}
                                     onClick={() => setIsLightboxOpen(true)}/>
                                <div className="magnifier-icon">
                                    <FaSearch onClick={() => setIsLightboxOpen(true)}/>
                                </div>
                                <div className="navigation-button left"
                                     onClick={() => setPhotoIndex((photoIndex + auctionImages.length - 1) % auctionImages.length)}>
                                    <FaArrowLeft/>
                                </div>
                                <div className="navigation-button right"
                                     onClick={() => setPhotoIndex((photoIndex + 1) % auctionImages.length)}>
                                    <FaArrowRight/>
                                </div>
                                <div className="image-caption">
                                    Zdjęcie {photoIndex + 1} z {auctionImages.length}
                                </div>
                            </div>

                            {isLightboxOpen && (
                                <Lightbox
                                    mainSrc={auctionImages[photoIndex]}
                                    nextSrc={auctionImages[(photoIndex + 1) % auctionImages.length]}
                                    prevSrc={auctionImages[(photoIndex + auctionImages.length - 1) % auctionImages.length]}
                                    onCloseRequest={() => setIsLightboxOpen(false)}
                                    onMovePrevRequest={() =>
                                        setPhotoIndex((photoIndex + auctionImages.length - 1) % auctionImages.length)
                                    }
                                    onMoveNextRequest={() =>
                                        setPhotoIndex((photoIndex + 1) % auctionImages.length)
                                    }
                                />
                            )}
                        </div>
                        )
                    }

                    <div className="bg-white rounded-lg shadow-md p-4 md:w-1/3">
                        <h2 className="text-[2.2vw] font-normal mb-5">
                            {auctionInfo.name}
                        </h2>
                        <p className="text-[1.8vw] font-semibold mb-10">{auctionInfo.price} zł</p>
                        <p className="text-[1.5vw] font-bold mb-5">OPIS</p>
                        <p className="text-[1.25vw] text-gray-600">
                            {auctionInfo.description}
                        </p>
                        <hr className="border-0 h-[1px] my-3 bg-slate-500 font-bold"/>
                        <div className="flex">
                            <p className="w-[50%] text-left">ID: {auctionInfo.id}</p>
                            <p className="w-[50%] text-right">Wyświetlenia: {auctionInfo.viewCount}</p>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2 */}
                <div
                    className="mt-3 flex flex-col w-[20%] max-w-screen-md bg-white rounded-lg shadow-md p-4 space-y-4 self-start">
                    <div className="bg-white rounded-lg shadow-md p-[1vw] grid">
                        <h3 className="text-[1.2vw] font-semibold text-center">Dane użytkownika</h3>
                        <Link
                            to={`/ogloszenia-uzytkownika/${userData.id}`}
                            className="bg-blue-500 text-white text-center py-[0.5vw] px-[1vw] mt-2 rounded-md hover:bg-blue-600 text-[1vw]">
                            Sprzedający: {userData.username}
                        </Link>
                        {showPhoneNumber ? (
                            <p className="mb-1 text-[1vw] text-center mt-5">
                                Numer telefonu: {formatPhoneNumber(auctionInfo.phoneNumber)}
                            </p>
                        ) : (
                            <button
                                onClick={togglePhoneNumber}
                                className="bg-blue-500 text-white py-[0.5vw] px-[1vw] rounded-md mt-2 hover:bg-blue-600 text-[1vw] mr-1">
                                Pokaż numer
                            </button>
                        )}
                        <button
                            className="bg-blue-500 text-white py-[0.5vw] px-[1vw] rounded-md mt-2 hover:bg-blue-600 text-[1vw]">
                            Wyślij wiadomość
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow-md">
                        <p className="text-[1vw] font-semibold m-4">
                            Województwo: {auctionInfo.province.charAt(0).toUpperCase() + auctionInfo.province.slice(1)}
                        </p>
                        <p className="text-[1vw] font-semibold m-4">
                            Miejscowość: {auctionInfo.cityName}
                        </p>
                    </div>
                    {(isSuperAdmin() ||
                        canDeleteAuctions()) && (
                        <div className=" bg-white rounded-lg shadow-md p-[1vw]">
                            <Link
                                className="right text-blue-400 hover:text-blue-700"
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
                                <BsXCircle color="red" size={20} z={100}/>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
