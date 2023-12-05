import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import EditProfile from "../components/account/EditProfile"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import {ToastContainer} from "react-toastify";

export function EditProfilePage() {
    return (
        <div className="flex flex-col">
            <ToastContainer/>
            <Navbar />
            <ScrollToTop />
            <ScrollToTopButton />
            <EditProfile />
            <Footer />
        </div>
    )
}