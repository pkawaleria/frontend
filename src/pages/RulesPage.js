import Rules from '../components/rules/Rules'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function RulesPage() {

    return (
        <>
            <Navbar/>
            <ScrollToTop/>
            <ScrollToTopButton/>
            <Rules/>
            <Footer />
        </>
    )
}
