import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Tooltip } from "react-tooltip"
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi"

export default function PromotedAuctionsComponent({ fetchFunction, pageNumber, pageSize, onPageChange }) {
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
            onPageChange(pageNumber - 1)
        }
    };

    const handleNextPage = () => {
        if (pageNumber + 1 < pagedAuctions.pageCount) {
            onPageChange(pageNumber + 1)
        }
    };

    return (
        <div className="h-[70%] py-6 px-6 flex flex-col items-center justify-center bg-linear-top-bottom">
            <div className="flex-grow rounded bg-transparent">
                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto px-6 mt-5 mb-5">
                    {pagedAuctions.auctions.map(auction => (
                        <Link
                            to={`/ogloszenie/${auction.id}`}
                            key={auction.id}
                            className="bg-white border-2 border-white p-4 
                                                rounded-lg shadow-md transition-transform duration-500 
                                                hover:scale-[1.02] hover:shadow-2xl hover:cursor-pointer">
                            <div className="relative">
                                <img src={`data:image/jpeg;base64,${auction.thumbnail}`} alt={auction.name} className="w-full" />
                            </div>
                            <h3 name={auction.name} className="text-xl font-semibold mt-2 overflow-hidden overflow-ellipsis max-h-14">
                                {auction.name.length > 30 ? auction.name.slice(0, 27) + "..." : auction.name}
                            </h3>
                            <Tooltip id={`tooltip-${auction.id}`} place="top" effect="solid" className="custom-tooltip-style">
                                {auction.name}
                            </Tooltip>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex">
                <BiChevronsLeft
                    className={`m-auto icon-hover text-white text-[2.5vw] ease-linear duration-200 ${
                        pageNumber === 0 ? 'disabled' : 'cursor-pointer'
                    }`}
                    onClick={handlePreviousPage}
                    disabled={pageNumber === 0} />
                    <span className="my-auto text-white">
                        Strona {pagedAuctions.pageNumber + 1} z {pagedAuctions.pageCount}
                    </span>
                <BiChevronsRight
                    className={`m-auto icon-hover text-white text-[2.5vw] ease-linear duration-200 ${
                        pageNumber + 1 === pagedAuctions.pageCount ? 'disabled' : 'cursor-pointer'
                    }`}
                    onClick={handleNextPage}
                    disabled={pageNumber === pagedAuctions.pageCount} />
            </div>
        </div>
    )
}