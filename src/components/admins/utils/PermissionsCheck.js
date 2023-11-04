import jwt_decode from "jwt-decode";

export function canDeleteAuctions() {
  const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  return (
    decodedToken.roles === "ADMIN" &&
    Array.isArray(decodedToken.permissions) &&
    decodedToken.permissions.includes("ADM001")
  );
}

export function canAcceptAuctions() {
  const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  return (
    decodedToken.roles === "ADMIN" &&
    Array.isArray(decodedToken.permissions) &&
    decodedToken.permissions.includes("ADM002")
  );
}

export function canAddPerms() {
  const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  return (
    decodedToken.roles === "ADMIN" &&
    Array.isArray(decodedToken.permissions) &&
    decodedToken.permissions.includes("ADM003")
  );
}

export function canAddCateogires() {
  const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  return (
    decodedToken.roles === "ADMIN" &&
    Array.isArray(decodedToken.permissions) &&
    decodedToken.permissions.includes("ADM004")
  );
}

export function canEditAuctions() {
  const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  return (
    decodedToken.roles === "ADMIN" &&
    Array.isArray(decodedToken.permissions) &&
    decodedToken.permissions.includes("ADM005")
  );
}

export function canBlockUsers() {
  const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  return (
    decodedToken.roles === "ADMIN" &&
    Array.isArray(decodedToken.permissions) &&
    decodedToken.permissions.includes("ADM006")
  );
}

export function canEditCategories() {
  const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  return (
    decodedToken.roles === "ADMIN" &&
    Array.isArray(decodedToken.permissions) &&
    decodedToken.permissions.includes("ADM007")
  );
}

export function isSuperAdmin() {
  const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  return (
    decodedToken.roles === "ADMIN" && decodedToken.isSuperAdmin
  );
}
