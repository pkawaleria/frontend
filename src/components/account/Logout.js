export const Logout = () => {
    localStorage.removeItem('accessToken')
    window.location = "/"
}

