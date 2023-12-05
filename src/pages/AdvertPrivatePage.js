import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import FullPrivateAuctionInfo from "../components/auctions/FullPrivateAuctionInfo"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function AdvertPrivatePage() {
    return (
        <div className="h-full flex flex-col">
           <Navbar/>
           <ScrollToTop/>
           <ScrollToTopButton/>
           <FullPrivateAuctionInfo/>
           <Footer/>
        </div>
    )
}