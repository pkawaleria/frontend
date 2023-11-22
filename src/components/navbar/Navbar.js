import { resolveUserType } from "../../services/userResolverService";
import UnloggedUserNavbar from "./UnloggedUserNavbar"
import LoggedInUserNavbar from "./LoggedInUserNavbar"
import AdminNavbar from "./AdminNavbar"

export default function Navbar() {


    const selectNavbar = () => {
        const token = localStorage.getItem("accessToken")
        if (token === null) return <UnloggedUserNavbar />

        const {resolvedUser, userName} = resolveUserType(token)
        if (resolvedUser === "loggedInUser") return <LoggedInUserNavbar userName={userName}/>
        if (resolvedUser === "adminUser") return <AdminNavbar />
    }

    return (
        selectNavbar()
    )
}