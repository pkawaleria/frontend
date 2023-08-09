import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const SingleCard = ({ point }) => {
  return (
    <div className="card mb-4">
      <div className="card-body mb-3 d-flex align-items-stretch">
        <p className="card-text">{point}</p>
      </div>
    </div>
  );
};

export default SingleCard;