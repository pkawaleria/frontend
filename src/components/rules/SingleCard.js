import React from 'react';
import '../../assets/styles/singlecard/singlecard.css'

export default function SingleCard({ point, isFontLarge }) {
  return (
    <div className="card mb-4">
      <div className="card-body mb-3 d-flex align-items-stretch card-hover-shadow rounded-sm">
        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} card-text p-1 italic text-white`}>{point}</p>
      </div>
    </div>
  );
}