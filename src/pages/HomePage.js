import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import SearchAuctionsPage from "../components/auctions/SearchAuctionsPage";

export function HomePage() {
    return (
        <div className="h-full flex flex-col">
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <SearchAuctionsPage />
            <Footer />
        </div>
    )
}