import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import UsersAuctions from "../components/auctions/UsersAuctions"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function UsersAuctionsPage() {
    return (
        <div className="h-screen flex flex-col">
           <Navbar/>
           <ScrollToTop/>
           <ScrollToTopButton/>
           <UsersAuctions/>
           <Footer/>
        </div>
    )
}