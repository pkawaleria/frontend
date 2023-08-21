import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import PromotedAuctions from "../components/auctions/PromotedAuctions"
import SearchBar from "../components/searchBar/SearchBar"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function HomePage() {
    return (
        <div className="h-full flex flex-col">
           <Navbar/>
           <ScrollToTop/>
           <ScrollToTopButton/>
           <SearchBar/>
           <PromotedAuctions/>
           <Footer/>
        </div>
    )
}