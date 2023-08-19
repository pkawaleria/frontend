import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import UsersAuctions from "../components/auctions/UsersAuctions"

export function UsersAuctionsPage() {
    return (
        <div className="h-screen flex flex-col">
           <Navbar/>
           <UsersAuctions/>
           <Footer/>
        </div>
    )
}