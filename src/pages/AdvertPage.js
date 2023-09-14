import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import FullAuctionInfo from "../components/auctions/FullAuctionInfo"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import { useFontSize } from "../components/themes/FontSizeContext"

export function AdvertPage() {

    const { fontSize } = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div className="h-full flex flex-col" style={style}>
           <Navbar/>
           <ScrollToTop/>
           <ScrollToTopButton/>
           <FullAuctionInfo/>
           <Footer/>
        </div>
    )
}