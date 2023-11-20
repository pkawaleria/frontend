import React from "react";
import { Link } from "react-router-dom";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

export default function GenericPageableAuctionList({
    pagedAuctions,
    onPageChange
}) {
    const handlePreviousPage = () => {
        if (pagedAuctions.pageNumber > 0) {
            onPageChange(pagedAuctions.pageNumber - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleNextPage = () => {
        if (pagedAuctions.pageNumber + 1 < pagedAuctions.pageCount) {
            onPageChange(pagedAuctions.pageNumber + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-[15%]">
                {pagedAuctions.auctions.map((auction) => (
                    <Link
                        to={`/ogloszenie/${auction.id}`}
                        key={auction.id}
                        className="border rounded-lg overflow-hidden shadow-lg bg-white flex">
                        <img
                            src={`data:image/jpeg;base64,${auction.thumbnail}`}
                            alt={auction.name}
                            className="object-cover"
                        />
                        {console.log(auction)}
                        <div className="w-4/5 pl-4 py-2 flex flex-col">
                            <div className="flex h-1/5">
                                <p className="text-xl font-semibold w-[50%] text-left">
                                    {auction.name.length > 30
                                        ? auction.name.slice(0, 27) + "..."
                                        : auction.name}
                                </p>
                                <p className="w-[50%] text-right italic">
                                    {auction.categoryPath.pathElements[0].name} / { auction.categoryPath.pathElements.length > 2 
                                        ? `... / ${auction.categoryPath.pathElements[auction.categoryPath.pathElements.length-1].name}` : auction.categoryPath.pathElements[1].name
                                    }
                                </p>
                            </div>
                            <p className="text-gray-600 text-lg h-3/5">
                                Cena: {auction.price} zł
                            </p>
                            <div className="flex">
                                <p className="text-base h-1/5 w-[50%] text-left">
                                    {auction.province.charAt(0).toUpperCase() + auction.province.slice(1)} / {auction.cityName}
                                </p>
                                <p className="text-base h-1/5 w-[50%] text-right">
                                    Wyświetlenia: {auction.viewCounter}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex justify-center max-w-screen-xl mx-auto px-6 my-3 text-white">
                <BiChevronsLeft
                    className={`icon-hover text-[3.5vw] ease-linear duration-200 ${pagedAuctions.pageNumber === 0 ? "disabled" : "cursor-pointer"
                        }`}
                    onClick={handlePreviousPage}
                    disabled={pagedAuctions.pageNumber === 0}
                />
                <span className="my-auto text-xl">
                    Strona {pagedAuctions.pageNumber + 1} z {pagedAuctions.pageCount}
                </span>
                <BiChevronsRight
                    className={`icon-hover text-[3.5vw] ease-linear duration-200 ${pagedAuctions.pageNumber + 1 === pagedAuctions.pageCount
                        ? "disabled"
                        : "cursor-pointer"
                        }`}
                    onClick={handleNextPage}
                    disabled={pagedAuctions.pageNumber + 1 === pagedAuctions.pageCount}
                />
            </div>
        </div>
    );
}
