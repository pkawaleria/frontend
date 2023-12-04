import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'
import {useFontSize} from "../components/fontSize/FontSizeContext"
import CategoryWithSubcategories from "../components/categories/CategoryWithSubcategories";
import {useParams} from "react-router-dom";
import {ToastContainer} from "react-toastify";

export function CategoryWithSubcategoriesPage() {

    const {fontSize} = useFontSize();
    const {id} = useParams();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div className="h-full flex flex-col" style={style}>
            <ToastContainer/>
            <Navbar/>
            <ScrollToTop/>
            <ScrollToTopButton/>
            <CategoryWithSubcategories id={id}/>
            <Footer/>
        </div>
    )
}