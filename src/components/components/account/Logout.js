export default function Logout() {
    localStorage.removeItem('accessToken')
    window.location = "/"
}