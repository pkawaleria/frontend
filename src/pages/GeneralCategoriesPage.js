import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import GeneralCategories from "../components/categories/GeneralCategories";
import {ToastContainer} from "react-toastify";

export function GeneralCategoriesPage() {
    return (
        <div className="h-full flex flex-col">
            <ToastContainer/>
            <Navbar/>
            <ScrollToTop/>
            <ScrollToTopButton/>
            <GeneralCategories/>
            <Footer/>
        </div>
    )
}