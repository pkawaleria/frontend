import Register from "../components/authorization/Register"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function RegisterPage() {
    return (
        <>
        <ScrollToTop/>
        <ScrollToTopButton/>
        <Register />
        </>

    )
}