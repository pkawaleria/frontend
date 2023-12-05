import React from "react";
import { Link } from "react-router-dom";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import "../../assets/styles/index.css";
import { useFontSize } from "../fontSize/FontSizeContext"

export default function GenericPageableAuctionList({
    pagedAuctions,
    onPageChange
}) {
    const {isFontLarge} = useFontSize();
    
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

    const formatPrice = (price) => {
        const parts = price.toFixed(2).toString().split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const decimalPart = parts[1] === '00' ? '' : `.${parts[1]}`;
        const formattedPrice = `${integerPart}${decimalPart} zł`;

        return formattedPrice;
    };

    return (
        <div className="container mx-auto mt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-[15%]">
                {pagedAuctions.auctions.map((auction) => (
                    <Link
                        to={`/ogloszenie/${auction.id}`}
                        key={auction.id}
                        className="flex border rounded-lg overflow-hidden bg-white hover:bg-neutral-300 dark:hover:bg-neutral-800 duration-100 ease-linear dark:bg-neutral-900 dark:text-neutral-100">
                        <img
                            src={`data:image/jpeg;base64,${auction.thumbnail}`}
                            alt={auction.name}
                            className="object-cover"
                            style={{width: "300px", height: "300px"}}/>
                        <div className="w-[100%] px-3 py-2 flex flex-col">
                            <div className="flex h-1/5">
                                <p className={`${isFontLarge ? "text-3xl" : "text-xl"} font-semibold w-[50%] text-left`}>
                                    {auction.name.length > 30
                                        ? auction.name.slice(0, 27) + "..."
                                        : auction.name}
                                </p>
                                <p className={`w-[50%] text-right italic ${isFontLarge ? "text-xl" : "text-base"}`}>
                                    {auction.categoryPath.pathElements.length > 0
                                        ? (
                                            <>
                                                {auction.categoryPath.pathElements[0].name}
                                                {auction.categoryPath.pathElements.length > 2
                                                    ? ` / ... / ${auction.categoryPath.pathElements[auction.categoryPath.pathElements.length - 1].name}`
                                                    : (auction.categoryPath.pathElements.length > 1
                                                        ? ` / ${auction.categoryPath.pathElements[1].name}`
                                                        : '')
                                                }
                                            </>
                                        )
                                        : ''
                                    }
                                </p>
                            </div>
                            <p className={`text-gray-600 dark:text-neutral-300 ${isFontLarge ? "text-2xl mt-1" : "text-lg"} h-3/5`}>
                                Cena: {formatPrice(auction.price)}
                            </p>
                            <div className="flex">
                                <p className={`${isFontLarge ? "text-xl" : "text-base"} h-1/5 w-[50%] text-left`}>
                                    {auction.province.charAt(0).toUpperCase() + auction.province.slice(1)} / {auction.cityName}
                                </p>
                                <p className={`${isFontLarge ? "text-xl" : "text-base"} h-1/5 w-[50%] text-right`}>
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
                <span className={`my-auto ${isFontLarge ? "text-3xl" : "text-xl"}`}>
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
