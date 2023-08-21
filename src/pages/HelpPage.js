import Help from '../components/help/Help'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function HelpPage() {
    return (
        <>
            <Navbar/>
            <ScrollToTop/>
            <ScrollToTopButton/>
            <Help/>
            <Footer />
        </>
    )
}