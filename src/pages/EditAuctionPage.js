import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import EditAuction from "../components/auctions/EditAuction"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import {ToastContainer} from "react-toastify";

export function EditAuctionPage() {
    return (
        <div className="h-full flex flex-col">
            <ToastContainer/>
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <EditAuction />
            <Footer />
        </div>
    )
}