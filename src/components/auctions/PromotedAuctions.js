import React, { useState } from "react";
import GenericAuctionsListPage from "./GenericAuctionsListPage";
import { fetchAllAuctions } from "../../services/auctionsService";

export default function PromotedAuctions() {
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 12;

  return (
    <GenericAuctionsListPage
      fetchFunction={fetchAllAuctions}
      pageNumber={pageNumber}
      pageSize={pageSize}
      onPageChange={setPageNumber}
    />
  );
}
