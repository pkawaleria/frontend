import Register from "../components/authorization/Register"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import { useFontSize } from "../components/themes/FontSizeContext"
import Footer from "../components/footer/Footer"
import Navbar from '../components/navbar/Navbar'

export function RegisterPage() {

    const { fontSize } = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div className="h-full flex flex-col" style={style}>
            <Navbar/>
            <ScrollToTop />
            <ScrollToTopButton />
            <Register />
            <Footer/>
        </div>

    )
}