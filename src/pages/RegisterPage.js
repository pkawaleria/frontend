import Register from "../components/authorization/Register"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import {ToastContainer} from "react-toastify";

export function RegisterPage() {
    return (
        <div className="h-full flex flex-col">
            <ToastContainer/>
            <ScrollToTop />
            <ScrollToTopButton />
            <Register />
        </div>

    )
}