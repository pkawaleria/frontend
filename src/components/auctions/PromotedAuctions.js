import React, { useState, useEffect } from "react";
import { Tooltip } from 'react-tooltip';
import { PromotedAuctionsInputs } from './utils/PromotedAuctionsInput'
import axios from "axios";

export default function PromotedAuctions() {
  const [all12Auctions, setAll12Auctions] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_AUCTIONS_MS_BASE_URL}/auctions/search`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAll12Auctions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych aukcji:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[70%] py-6 px-6 flex flex-col items-center justify-center bg-linear-top-bottom">
        <div className="flex-grow rounded bg-transparent">
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto px-6 mt-5 mb-5">
            Ładowanie...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[70%] py-6 px-6 flex flex-col items-center justify-center bg-linear-top-bottom">
      <div className="flex-grow rounded bg-transparent">
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto px-6 mt-5 mb-5">
          {all12Auctions.auctions.map((auction) => {
            return (
              <div key={auction.id} className="bg-white border-2 border-white p-4 
              rounded-lg shadow-md transition-transform duration-500 
              hover:scale-[1.02] hover:shadow-2xl hover:cursor-pointer">
                <div className="relative">
                  <img src={auction.thumbnail} alt={auction.name} className="w-full" />
                </div>
                <h3 name={auction.name} className="text-xl font-semibold mt-2 overflow-hidden overflow-ellipsis max-h-14">
                  {auction.name.length > 30 ? auction.name.slice(0, 27) + "..." : auction.name}
                </h3>
                <Tooltip id={`tooltip-${auction.id}`} place="top" effect="solid" className="custom-tooltip-style">
                  {auction.name}
                </Tooltip>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}
