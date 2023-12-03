import React from 'react';
import SingleCard from './SingleCard';
import '../../assets/styles/rules/rules.css'
import { rulesPoints } from './utils/RulesPoints';

export default function Regulamin() {
    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const chunkedRulesPoints = chunkArray(rulesPoints, 3);

    return (
        <div className="flex gradient-bg-color-only mt-2 h-screen">
            <div className="mx-auto mt-[2%] my-[10%] w-3/4 border-2 border-white rounded">
                <h1 className="pt-4 text-center text-white text-3xl font-bold mb-4">Regulamin Serwisu Ogłoszeniowego</h1>
                {chunkedRulesPoints.map((chunk, rowIndex) => (
                    <div key={rowIndex} className="flex justify-cente">
                        {chunk.map((point, index) => (
                            <div key={index} className="w-full md:w-1/3 px-4">
                                <SingleCard point={point} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};