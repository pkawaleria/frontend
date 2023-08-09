import { Link } from "react-router-dom"

export default function SwapToLogin({isOn}) {
    return (
        <Link to="/logowanie" className="w-full">
            {isOn === true ? (
                <button className="swap-button bg-blue-500 border-blue-500">
                    LOGOWANIE
                </button>
            ) : (
                <button className="swap-button hover:ease-linear hover:bg-sky-700/50 hover:text-white hover:border-sky-700/50">
                    LOGOWANIE
                </button>
            )}
        </Link>
    )
}