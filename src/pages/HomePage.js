import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import PromotedAuctions from "../components/Auctions/PromotedAuctions"

export function HomePage() {
    return (
        <>
           <Navbar/>
           {/* <SearchBar/> */}
           <PromotedAuctions/>
           <Footer/>
        </>
    )
}