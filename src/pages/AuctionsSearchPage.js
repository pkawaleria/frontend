import {useFontSize} from "../components/fontSize/FontSizeContext"
import React from "react";
import {ToastContainer} from "react-toastify";
import Navbar from "../components/navbar/Navbar";
import ScrollToTop from "../components/functions/ScrollToTop";
import ScrollToTopButton from "../components/functions/ScrollToTopButton";
import Footer from "../components/footer/Footer";
import SearchAuctionsPage from "../components/auctions/SearchAuctionsPage";

export function AuctionsSearchPage() {

    const {fontSize} = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div className="h-full flex flex-col" style={style}>
            <ToastContainer/>
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <SearchAuctionsPage />
            <Footer />
        </div>
    )
}