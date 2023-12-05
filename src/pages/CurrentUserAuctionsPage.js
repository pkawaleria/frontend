import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import {ToastContainer} from "react-toastify";
import CurrentUserMostViewedAuctions from "../components/auctions/CurrentUserMostViewedAuctions";
import CurrentUserRecentlyViewedAuctions from "../components/auctions/CurrentUserRecentlyViewedAuctions";

export function CurrentUserAuctionsPage() {
    return (
        <div className="h-full flex flex-col">
            <ToastContainer/>
            <Navbar/>
            <ScrollToTop/>
            <ScrollToTopButton/>
            <CurrentUserMostViewedAuctions/>
            <CurrentUserRecentlyViewedAuctions/>
            <Footer/>
        </div>
    )
}
