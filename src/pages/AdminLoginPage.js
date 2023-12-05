import Login from "../components/admins/authorization/Login"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import {ToastContainer} from "react-toastify";

export function AdminLoginPage() {
    return (
        <div div className="h-full flex flex-col">
            <ToastContainer/>
            <ScrollToTop />
            <ScrollToTopButton />
            <Login />
        </div>
    )
}