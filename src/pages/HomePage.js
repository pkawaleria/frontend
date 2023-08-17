import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import PromotedAuctions from "../components/Auctions/PromotedAuctions"
import SearchBar from "../components/SearchBar/SearchBar"

export function HomePage() {
    return (
        <>
           <Navbar/>
           <SearchBar/>
           <PromotedAuctions/>
           <Footer/>
        </>
    )
}