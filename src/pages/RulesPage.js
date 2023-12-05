import Rules from '../components/rules/Rules'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import {ToastContainer} from "react-toastify";

export function RulesPage() {
    return (
        <div className="h-full flex flex-col">
            <ToastContainer/>
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <Rules />
            <Footer />
        </div>
    )
}
