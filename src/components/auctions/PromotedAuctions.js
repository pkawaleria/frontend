import React from "react"
import { PromotedAuctionsInputs } from './utils/PromotedAuctionsInput'

export default function PromotedAuctions() {

    return (
        <div className="h-[70%] py-6 px-6 flex flex-col items-center justify-center bg-linear-top-bottom">
            <div className="flex-grow rounded bg-transparent">
                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto px-6 mt-5 mb-5">
                    {PromotedAuctionsInputs.map((ad) => (
                        <div
                            key={ad.id}
                            className="bg-white border-2 border-white p-4 rounded-lg shadow-md transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl hover:cursor-pointer"
                        >
                            <div className="relative">
                                <div className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-1 rounded-bl">
                                    Promowane
                                </div>
                                <img src={ad.image} alt={ad.title} className="w-full" />
                            </div>
                            <h3 className="text-xl font-semibold mt-2">{ad.title}</h3>
                            <p className="text-gray-600 mt-1">Data dodania: {ad.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
