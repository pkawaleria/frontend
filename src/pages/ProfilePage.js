import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import Profile from "../components/account/Profile"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

export function ProfilePage() {
    return (
        <div className="h-screen flex flex-col">
           <Navbar/>
           <ScrollToTop/>
           <ScrollToTopButton/>
           <Profile/>
           <Footer/>
        </div>
    )
}