import React, { useEffect, useState } from "react";
import { resolveUserType } from "../../services/userResolverService";
import UnloggedUserNavbar from "./UnloggedUserNavbar";
import LoggedInUserNavbar from "./LoggedInUserNavbar";
import AdminNavbar from "./AdminNavbar";
import { getUserFullInfo } from "../../services/accountsService";

export default function Navbar() {
    const [userFirstName, setUserFirstName] = useState(null);
    const [resolvedUser, setResolvedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
            if (token !== null) {
                try {
                    const userInfo = await getUserFullInfo(token);
                    setUserFirstName(userInfo.firstname);
                    setResolvedUser(resolveUserType(token));
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
        return <AdminNavbar />;
    }

    return <UnloggedUserNavbar />;
}
