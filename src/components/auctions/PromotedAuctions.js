import React, { useState } from "react";
import PromotedAuctionsComponent from "./PromotedAuctionsComponent";
import { fetchAllAuctions } from "../../services/auctionsService";

export default function PromotedAuctions() {
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 12;

  return (
    <PromotedAuctionsComponent
      fetchFunction={fetchAllAuctions}
      pageNumber={pageNumber}
      pageSize={pageSize}
      onPageChange={setPageNumber}
    />
  );
}
