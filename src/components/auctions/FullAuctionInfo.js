import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { BsXCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import axios from "axios";

import {canDeleteAuctions, isSuperAdmin} from '../admins/utils/PermissionsCheck'

export default function FullAuctionInfo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const { id } = useParams();
  const [auctionInfo, setAuctionInfo] = useState(null);
  const [auctionImages, setAuctionImages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setisAdmin] = useState(false);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? auctionImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === auctionImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const togglePhoneNumber = () => {
    setShowPhoneNumber((prevValue) => !prevValue);
  };

  const deleteAuction = async () => {
    const token = localStorage.getItem("accessToken")
    const resp = await axios.delete(
      `${process.env.REACT_APP_AUCTIONS_MS_AUCTION_SERVICE_AUCTIONS_URL}/${auctionInfo.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    window.location="/"
  };

  useEffect(() => {
    const fetchAuctionInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_AUCTIONS_MS_AUCTION_SERVICE_AUCTIONS_URL}/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAuctionInfo(response.data);

        const auctioneerId = response.data.auctioneerId;

        const auctioneerResponse = await axios.get(
          `${process.env.REACT_APP_ACCOUNTING_MS_USERS_ACCOUNT_SHORT}/${auctioneerId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUserData(auctioneerResponse.data);

        const response2 = await axios.get(
          `${process.env.REACT_APP_AUCTIONS_MS_AUCTION_SERVICE_AUCTIONS_URL}/${id}/images`
        );

        const imageIDs = response2.data.imageIDs;
        const imagePromises = imageIDs.map(async (imageID) => {
          const imageResponse = await axios.get(
            `${process.env.REACT_APP_AUCTIONS_MS_AUCTION_SERVICE_AUCTIONS_URL}/${id}/images/${imageID}`,
            {
              responseType: "arraybuffer",
              headers: {
                "Content-Type": "image/jpeg",
              },
            }
          );

          return new Blob([imageResponse.data], { type: "image/jpeg" });
        });

        const images = await Promise.all(imagePromises);
        setAuctionImages(images);
        setLoading(false);
      } catch (error) {
        console.error(
          "Wystąpił błąd podczas pobierania danych ogłoszenia:",
          error
        );
      }
    };

    if (id) {
      fetchAuctionInfo();
    }

    try {
      if (canDeleteAuctions(localStorage.getItem("accessToken")) || isSuperAdmin(localStorage.getItem("accessToken"))) {
        setisAdmin(true);
      }
    } catch {}
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <p>Ładowanie...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gradient-bg-color-only pt-[2.5vh] px-2 h-[80%] w-full">
      <div className="mt-3 mb-5 flex flex-col md:flex-row w-[70%] max-w-screen-xl bg-white rounded-lg shadow-md p-6 space-y-6 md:space-y-0 md:space-x-6 mr-2 self-start mw-480:p-4">
        {/* COLUMN 1 */}
        <div className="bg-white rounded-lg shadow-md md:w-2/3 mb-10">
          <div className="flex">
            <button
              className="flex-none bg-gray-100 hover:bg-gray-200 p-2"
              onClick={goToPreviousImage}
            >
              <FaChevronLeft className="text-[1.5vw]" />
            </button>
            <div className="flex-grow flex items-center justify-center">
              {auctionImages.length > 0 ? (
                auctionImages.map((imageBlob, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(imageBlob)}
                    alt={`Image ${index}`}
                    className=""
                  />
                ))
              ) : (
                <p>Brak obrazów</p>
              )}
            </div>
            <button
              className="flex-none bg-gray-100 hover:bg-gray-200 p-2"
              onClick={goToNextImage}
            >
              <FaChevronRight className="text-[1.5vw]" />
            </button>
          </div>
          <div className="flex justify-center mt-5 mb-2 space-x-2">
            {auctionImages.map((image, index) => (
              <div
                key={index}
                className={`w-[1.2vw] h-[1.2vw] bg-gray-300 rounded-md cursor-pointer transform hover:scale-125 transition-transform ${
                  index === currentImageIndex ? "bg-gray-500" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              ></div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 md:w-1/3">
          <h2 className="text-[2.2vw] font-semibold mb-2">
            {auctionInfo.name}
          </h2>
          <p className="text-[1.8vw] font-medium mb-10">{auctionInfo.price}</p>
          <p className="text-[1.6vw] font-medium mb-5">Opis</p>
          <p className="text-[1.3vw] text-gray-600">
            {auctionInfo.description}
          </p>
        </div>
      </div>
      {/* COLUMN 2 */}
      <div className="mt-3 flex flex-col w-[20%] max-w-screen-md bg-white rounded-lg shadow-md p-4 space-y-4 self-start">
        <div className="bg-white rounded-lg shadow-md p-[1vw]">
          {isAdmin && (
            <Link
              className="right text-blue-400 hover:text-blue-700"
              data-tooltip-id="deleteAd"
              data-tooltip-content="Usuń ogłoszenie"
              onClick={deleteAuction}
            >
              <Tooltip
                id="deleteAd"
                type="dark"
                effect="solid"
                delayShow={200}
                delayHide={100}
              />
              <BsXCircle color="red" size={20} z={100} />
            </Link>
          )}
          <h3 className="text-[1.2vw] font-semibold mb-2">Dane użytkownika</h3>
          <Link
            to={`/ogloszenia-uzytkownika/${userData.id}`}
            className="bg-blue-500 text-white py-[0.5vw] px-[1vw] rounded-md mt-2 hover:bg-blue-600 text-[1vw]"
          >
            Sprzedający: {userData.username}
          </Link>
          {showPhoneNumber ? (
            <p className="mb-1 text-[1vw] mt-6">
              Numer telefonu: {userData.phone_number}
            </p>
          ) : (
            <button
              onClick={togglePhoneNumber}
              className="bg-blue-500 text-white py-[0.5vw] px-[1vw] rounded-md mt-6 hover:bg-blue-600 text-[1vw] mr-1"
            >
              Pokaż numer
            </button>
          )}
          <button className="bg-blue-500 text-white py-[0.5vw] px-[1vw] rounded-md mt-2 hover:bg-blue-600 text-[1vw]">
            Wyślij wiadomość
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <p className="text-[1vw] font-semibold m-4">
            Województwo: {/*exampleAd.province*/}
          </p>
        </div>
      </div>
    </div>
  );
}
