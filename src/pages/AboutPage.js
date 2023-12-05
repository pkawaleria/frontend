import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import About from "../components/about/About"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function AboutPage() {
    return (
        <div className="h-full flex flex-col">
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <About />
            <Footer />
        </div>
    )
}