import React, { useState } from "react";
import GenericAuctionComponent from "./GenericAuctionComponent";
import { fetchAllAuctions } from "../../services/auctionsService";

export default function GenericAuctionList() {
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 12;

  return (
    <GenericAuctionComponent
      fetchFunction={fetchAllAuctions}
      pageNumber={pageNumber}
      pageSize={pageSize}
      onPageChange={setPageNumber}
    />
  );
}
