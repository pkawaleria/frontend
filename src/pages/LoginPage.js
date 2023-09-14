import Login from "../components/authorization/Login"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import Footer from "../components/footer/Footer"
import Navbar from '../components/navbar/Navbar'
import { useFontSize } from "../components/themes/FontSizeContext"

export function LoginPage() {

    const { fontSize } = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div div className="h-full flex flex-col" style={style}>
            <Navbar/>
            <ScrollToTop />
            <ScrollToTopButton />
            <Login />
            <Footer/>
        </div>
    )
}