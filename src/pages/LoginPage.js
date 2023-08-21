import Login from "../components/authorization/Login"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function LoginPage() {
    return (
        <>
        <ScrollToTop/>
        <ScrollToTopButton/>
        <Login />
        </>
    )
}