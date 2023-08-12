import React from 'react';
import SingleCard from './SingleCard';
import Backimg from '../../assets/images/background.jpg'
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
        <div
            className="flex bg-cover mt-2 h-[800px]"
            style={{ backgroundImage: `url(${Backimg})` }}>
            <div className="mx-auto mt-[2%] my-[10%] w-3/4">
                <h1 className="pt-4 text-center text-black text-3xl font-bold mb-4">Regulamin Serwisu Ogłoszeniowego</h1>
                {chunkedRulesPoints.map((chunk, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center">
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