import jwt_decode from "jwt-decode";

export function canDeleteAuctions() {
    if (!doesTokenExist()) return
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
    return (
        decodedToken.roles === "ADMIN" &&
        Array.isArray(decodedToken.permissions) &&
        decodedToken.permissions.includes("ADM001")
    );
}

export function canAcceptAuctions() {
    if (!doesTokenExist()) return
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
    return (
        decodedToken.roles === "ADMIN" &&
        Array.isArray(decodedToken.permissions) &&
        decodedToken.permissions.includes("ADM002")
    );
}

export function canAddPerms() {
    if (!doesTokenExist()) return
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
    return (
        decodedToken.roles === "ADMIN" &&
        Array.isArray(decodedToken.permissions) &&
        decodedToken.permissions.includes("ADM003")
    );
}

export function canAddCateogires() {
    if (!doesTokenExist()) return
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
    return (
        decodedToken.roles === "ADMIN" &&
        Array.isArray(decodedToken.permissions) &&
        decodedToken.permissions.includes("ADM004")
    );
}

export function canEditAuctions() {
    if (!doesTokenExist()) return
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
    return (
        decodedToken.roles === "ADMIN" &&
        Array.isArray(decodedToken.permissions) &&
        decodedToken.permissions.includes("ADM005")
    );
}

export function canBlockUsers() {
    if (!doesTokenExist()) return
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
    return (
        decodedToken.roles === "ADMIN" &&
        Array.isArray(decodedToken.permissions) &&
        decodedToken.permissions.includes("ADM006")
    );
}

export function canEditCategories() {
    if (!doesTokenExist()) return
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
    return (
        decodedToken.roles === "ADMIN" &&
        Array.isArray(decodedToken.permissions) &&
        decodedToken.permissions.includes("ADM007")
    );
}

export function canCreateAdminAccount() {
    if (!doesTokenExist()) return
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
    return (
        decodedToken.roles === "ADMIN" &&
        Array.isArray(decodedToken.permissions) &&
        decodedToken.permissions.includes("ADM008")
    );
}

export function isSuperAdmin() {
    if (!doesTokenExist()) return
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));

    return (
        decodedToken.roles === "ADMIN" && decodedToken.isSuperAdmin
    );
}

export function isAdmin() {
    if (!doesTokenExist()) return
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
    return (
        decodedToken.roles === "ADMIN"
    );
}

const doesTokenExist = () => {
    return localStorage.getItem("accessToken");
}