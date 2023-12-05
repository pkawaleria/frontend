import Help from '../components/help/Help'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function HelpPage() {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <Help />
            <Footer />
        </div>
    )
}