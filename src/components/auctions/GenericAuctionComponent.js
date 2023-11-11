import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

export default function GenericAuctionComponent({
    fetchFunction,
    pageNumber,
    pageSize,
    onPageChange,
}) {
    const [pagedAuctions, setPagedAuctions] = useState({
        auctions: [],
        pageNumber: 0,
        pageCount: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchFunction(pageNumber, pageSize);
            setPagedAuctions(data);
        };

        fetchData();
    }, [fetchFunction, pageNumber, pageSize]);

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            onPageChange(pageNumber - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
            console.log(pagedAuctions)
        }
    };

    const handleNextPage = () => {
        if (pageNumber + 1 < pagedAuctions.pageCount) {
            onPageChange(pageNumber + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
            console.log(pagedAuctions)
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-[15%]">
                {pagedAuctions.auctions.map((auction) => (
                    <Link
                        to={`/ogloszenie/${auction.id}`}
                        key={auction.id}
                        className="border rounded-lg overflow-hidden shadow-lg bg-white flex hover:ml-3 ease-linear duration-100"
                    >
                        <img
                            src={`data:image/jpeg;base64,${auction.thumbnail}`}
                            alt={auction.name}
                            className="object-cover"
                        />
                        <div className="w-3/4 pl-4 pt-2 flex flex-col">
                            <h3 className="text-xl font-semibold h-1/5">
                                {auction.name.length > 30
                                    ? auction.name.slice(0, 27) + "..."
                                    : auction.name}
                            </h3>
                            <p className="text-gray-600 text-lg h-3/5">
                                Cena: {auction.price} zł
                            </p>
                            <p className="text-base h-1/5">
                                {auction.province} / {auction.cityName}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex justify-center max-w-screen-xl mx-auto px-6 my-3 text-white">
                <BiChevronsLeft
                    className={`icon-hover text-[3.5vw] ease-linear duration-200 ${pageNumber === 0 ? "disabled" : "cursor-pointer"
                        }`}
                    onClick={handlePreviousPage}
                    disabled={pageNumber === 0}
                />
                <span className="my-auto text-xl">
                    Strona {pagedAuctions.pageNumber + 1} z {pagedAuctions.pageCount}
                </span>
                <BiChevronsRight
                    className={`icon-hover text-[3.5vw] ease-linear duration-200 ${pageNumber + 1 === pagedAuctions.pageCount
                        ? "disabled"
                        : "cursor-pointer"
                        }`}
                    onClick={handleNextPage}
                    disabled={pageNumber === pagedAuctions.pageCount}
                />
            </div>
        </div>
    );
}
