import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import UsersAuctions from "../components/auctions/UsersAuctions"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import {ToastContainer} from "react-toastify";

export function UsersAuctionsPage() {
    return (
        <div className="h-full flex flex-col">
            <ToastContainer/>
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <UsersAuctions />
            <Footer />
        </div>
    )
}