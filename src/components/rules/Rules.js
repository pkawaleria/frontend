import React from 'react';
import SingleCard from './SingleCard';
import Backimg from '../../assets/images/background.jpg';
import '../../assets/styles/rules/rules.css';
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
    <div className="flex gradient-bg-color-only mt-2 min-h-screen">
      <div className="mx-auto mt-[2%] mb-[10%] w-full md:w-3/4 lg:w-2/3 xl:w-1/2 border-2 border-white rounded p-4">
        <h1 className="pt-4 text-center text-white text-3xl font-bold mb-4">Regulamin Serwisu Ogłoszeniowego</h1>
        {chunkedRulesPoints.map((chunk, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap justify-center -mx-4">
            {chunk.map((point, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                <SingleCard point={point} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
