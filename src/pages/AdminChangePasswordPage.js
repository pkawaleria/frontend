import ChangePassword from '../components/admins/account/ChangePassword'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import { useFontSize } from "../components/fontSize/FontSizeContext"

export function AdminChangePasswordPage() {

    const { fontSize } = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div className="h-screen flex flex-col" style={style}>
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <ChangePassword />
            <Footer />
        </div>
    )
}
