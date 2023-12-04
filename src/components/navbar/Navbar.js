import React, { useEffect, useState } from "react";
import { resolveUserType } from "../../services/userResolverService";
import UnloggedUserNavbar from "./UnloggedUserNavbar";
import LoggedInUserNavbar from "./LoggedInUserNavbar";
import AdminNavbar from "./AdminNavbar";
import { getAdminFullInfo } from "../../services/adminService";
import {getUserFullInfo} from "../../services/userService";

export default function Navbar() {
    const [userFirstName, setUserFirstName] = useState(null);
    const [resolvedUser, setResolvedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
            if (token !== null) {
                try {
                    const test = resolveUserType(token)
                    setResolvedUser(test)
                    if (test === "loggedInUser") {
                        const userInfo = await getUserFullInfo(token);
                        setUserFirstName(userInfo.firstname);
                    }
                    if (test === "adminUser") {
                        const userInfo = await getAdminFullInfo(token);
                        setUserFirstName(userInfo.firstname);
                    }
                } catch (error) {
                    console.error("Błąd podczas pobierania informacji o użytkowniku:", error);
                }
            }
        };

        fetchData();
    }, []);

    if (resolvedUser === "loggedInUser") {
        return <LoggedInUserNavbar userFirstName={userFirstName} />;
    }

    if (resolvedUser === "adminUser") {
        return <AdminNavbar adminFirstName={userFirstName} />;
    }

    return <UnloggedUserNavbar />;
}
