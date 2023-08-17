import React from 'react';
import '../../assets/styles/singlecard/singlecard.css'

export default function SingleCard({ point }) {
  return (
    <div className="card mb-4">
      <div className="card-body mb-3 d-flex align-items-stretch card-hover-shadow rounded-sm">
        <p className="card-text p-1 italic">{point}</p>
      </div>
    </div>
  );
}