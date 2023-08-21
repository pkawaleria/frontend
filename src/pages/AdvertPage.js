import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import FullAuctionInfo from "../components/auctions/FullAuctionInfo"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function AdvertPage() {
    return (
        <div className="h-screen flex flex-col">
           <Navbar/>
           <ScrollToTop/>
           <ScrollToTopButton/>
           <FullAuctionInfo/>
           <Footer/>
        </div>
    )
}