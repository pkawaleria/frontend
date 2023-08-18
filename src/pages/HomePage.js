import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import PromotedAuctions from "../components/auctions/PromotedAuctions"
import SearchBar from "../components/searchBar/SearchBar"

export function HomePage() {
    return (
        <div className="h-full flex flex-col">
           <Navbar/>
           <SearchBar/>
           <PromotedAuctions/>
           <Footer/>
        </div>
    )
}