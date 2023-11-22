import jwtDecode from "jwt-decode";
import { getUserFullInfo } from "./accountsService";

export const resolveUserType = (token) => {
    var resolvedUser = ""

    const decodedToken = jwtDecode(token);
    var userName = getUserFullInfo(token);
    console.log(userName)

    if (decodedToken.roles === "USER") {
        resolvedUser = "loggedInUser";
    }

    if (decodedToken.roles === "ADMIN") {
        resolvedUser = "adminUser";
    }

    return {resolvedUser, userName};
}