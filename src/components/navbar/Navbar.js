import { resolveUserType } from "../../services/userResolverService";
import UnloggedUserNavbar from "./UnloggedUserNavbar"
import LoggedInUserNavbar from "./LoggedInUserNavbar"
import AdminNavbar from "./AdminNavbar"

export default function Navbar() {
    const token = localStorage.getItem("accesToken")

    const selectNavbar = () => {
        if (token === null) return <UnloggedUserNavbar/>

        const resolvedUser = resolveUserType(token)
        if (resolvedUser === "loggedInUser") return <LoggedInUserNavbar/>
        if (resolvedUser === "adminUser") return <AdminNavbar/>
    }

    return (
        selectNavbar()
    )
}