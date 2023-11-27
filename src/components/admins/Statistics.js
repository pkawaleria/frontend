import React from "react";
import { isAdmin } from './utils/PermissionsCheck'

export default function Statistics() {
    const statisticsData = [
        { title: "Użytkownicy", value: 1234, color: "bg-blue-500" },
        { title: "Ogłoszenia", value: 567, color: "bg-green-500" },
        { title: "Kategorie", value: 890, color: "bg-yellow-500" },
        { title: "Transakcje", value: 345, color: "bg-red-500" },
        { title: "Przykład 1", value: 678, color: "bg-purple-500" },
        { title: "Przykład 2", value: 456, color: "bg-indigo-500" },
        { title: "Przykład 3", value: 789, color: "bg-pink-500" },
        { title: "Przykład 4", value: 123, color: "bg-gray-500" },
        { title: "Przykład 5", value: 456, color: "bg-red-500" },
    ];



    return (
        <div className="flex flex-col justify-center p-5">
            <span className="text-white text-[50px] font-bold mb-4 text-center">STATYSTYKI SYSTEMOWE</span>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {statisticsData.map((data, index) => (
                    <div key={index} className="bg-white rounded-lg w-[50%] mx-auto shadow-lg p-4 hover:scale-105 hover:cursor-pointer border-2 border-blue-500">
                        <div className={`rounded-lg shadow-lg text-white ${data.color}`}>
                            <div className="text-4xl font-semibold">{data.value}</div>
                            <div className="text-xl">{data.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
