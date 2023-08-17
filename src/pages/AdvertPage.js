import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import FullAuctionInfo from "../components/auctions/FullAuctionInfo"

export function AdvertPage() {
    return (
        <>
           <Navbar/>
           <FullAuctionInfo/>
           <Footer/>
        </>
    )
}