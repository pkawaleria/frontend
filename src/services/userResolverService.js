import jwtDecode from "jwt-decode";

export const resolveUserType = (token) => {
    var resolvedUser = ""
    const decodedToken = jwtDecode(token);
    
    if (decodedToken.roles === "USER") {
        resolvedUser = "loggedInUser";
    }

    if (decodedToken.roles === "ADMIN") {
        resolvedUser = "adminUser";
    }

    return resolvedUser;
}