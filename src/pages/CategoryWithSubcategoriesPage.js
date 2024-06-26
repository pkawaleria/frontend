import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import CategoryWithSubcategories from "../components/categories/CategoryWithSubcategories";
import {useParams} from "react-router-dom";
import {ToastContainer} from "react-toastify";

export function CategoryWithSubcategoriesPage() {
    const {id} = useParams();

    return (
        <div className="h-full flex flex-col">
            <ToastContainer/>
            <Navbar/>
            <ScrollToTop/>
            <ScrollToTopButton/>
            <CategoryWithSubcategories id={id}/>
            <Footer/>
        </div>
    )
}