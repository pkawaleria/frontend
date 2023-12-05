import jwtDecode from "jwt-decode";

export const resolveUserType = (token) => {
    const decodedToken = jwtDecode(token);
    
    if (decodedToken.roles === "USER") {
        return "loggedInUser";
    }
    else if (decodedToken.roles === "ADMIN") {
        return "adminUser";
    }
    return "anonymous";
}