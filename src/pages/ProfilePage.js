import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import Profile from "../components/account/Profile"

export function ProfilePage() {
    return (
        <div className="h-screen flex flex-col">
           <Navbar/>
           <Profile/>
           <Footer/>
        </div>
    )
}