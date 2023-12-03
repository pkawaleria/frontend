import Login from "../components/authorization/Login"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

import { useFontSize } from "../components/themes/FontSizeContext"
import {ToastContainer} from "react-toastify";

export function LoginPage() {
    const { fontSize } = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div className="h-full flex flex-col" style={style}>
            <ToastContainer/>
            <ScrollToTop />
            <ScrollToTopButton />
            <Login />
        </div>
    )
}