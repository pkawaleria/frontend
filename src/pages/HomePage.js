import React, {useEffect, useState} from "react";
import {resolveUserType} from "../services/userResolverService";
import {CurrentUserAuctionsPage} from "./CurrentUserAuctionsPage";
import {AuctionsSearchPage} from "./AuctionsSearchPage";

export function HomePage() {
    const [resolvedUser, setResolvedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
            if (token !== null) {
                try {
                    const userType = resolveUserType(token)
                    setResolvedUser(userType)
                } catch (error) {
                    console.error("Błąd podczas pobierania informacji o użytkowniku:", error);
                }
            }
        };

        fetchData();
    }, []);

    const baseUserPage = () => <CurrentUserAuctionsPage/>;
    const adminHomepage = () => <AuctionsSearchPage/>;



    if (resolvedUser === "loggedInUser" || resolvedUser === "anonymous" ) {
        return baseUserPage();
    } else if (resolvedUser === "adminUser") {
        return adminHomepage();
    } else {
        return baseUserPage();
    }
}