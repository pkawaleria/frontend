import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import AdminPanel from "../components/admins/AdminPanel"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import {ToastContainer} from "react-toastify";

export function AdminPanelPage() {
    return (
        <div className="h-full flex flex-col">
            <ToastContainer/>
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <AdminPanel />
            <Footer />
        </div>
    )
}