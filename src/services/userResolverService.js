import jwtDecode from "jwt-decode";

export const resolveUserType = (token) => {
    const decodedToken = jwtDecode(token);
    var resolvedUser = ""
    
    if (decodedToken.roles === "USER") {
        resolvedUser = "loggedInUser";
    }

    if (decodedToken.roles === "ADMIN") {
        resolvedUser = "adminUser";
    }

    return resolvedUser;
}