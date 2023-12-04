import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import Profile from "../components/admins/account/Profile"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import { useFontSize } from "../components/fontSize/FontSizeContext"
import {ToastContainer} from "react-toastify";

export function AdminProfilePage() {

    const { fontSize } = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div className="flex flex-col" style={style}>
            <ToastContainer/>
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <Profile />
            <Footer />
        </div>
    )
}