import { Link } from "react-router-dom"

export default function SwapToLogin({isOn}) {
    return (
        <Link to="/logowanie" className="w-full mh-xs:w-1/2">
            {isOn === true ? (
                <button className="swap-button bg-blue-500 text-white" disabled>
                    LOGOWANIE
                </button>
            ) : (
                <button className="swap-button hover:ease-linear hover:text-blue-500 hover:text-lg duration-75 mw-2xs:hover:text-sm">
                    LOGOWANIE
                </button>
            )}
        </Link>
    )
}