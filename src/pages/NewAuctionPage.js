import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import NewAuction from "../components/auctions/NewAuction"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import { useFontSize } from "../components/themes/FontSizeContext"

export function NewAuctionPage() {

    const { fontSize } = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div className="h-full flex flex-col" style={style}>
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <NewAuction />
            <Footer />
        </div>
    )
}