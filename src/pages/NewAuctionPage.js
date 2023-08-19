import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import NewAuction from "../components/auctions/NewAuction"

export function NewAuctionPage() {
    return (
        <div className="h-full flex flex-col">
           <Navbar/>
           <NewAuction/>
           <Footer/>
        </div>
    )
}