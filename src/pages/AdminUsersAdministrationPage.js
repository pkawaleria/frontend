import UsersAdministration from "../components/admins/UsersAdministration"
import Footer from "../components/footer/Footer"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import { useFontSize } from "../components/themes/FontSizeContext"
import Navbar from "../components/navbar/Navbar"

export function AdminUsersAdministrationPage() {
    const { fontSize } = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div className="h-full flex flex-col" style={style}>
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <UsersAdministration />
            <Footer />
        </div>

    )
}