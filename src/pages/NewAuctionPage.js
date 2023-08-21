import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import NewAuction from "../components/auctions/NewAuction"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function NewAuctionPage() {
    return (
        <div className="h-full flex flex-col">
           <Navbar/>
           <ScrollToTop/>
           <ScrollToTopButton/>
           <NewAuction/>
           <Footer/>
        </div>
    )
}