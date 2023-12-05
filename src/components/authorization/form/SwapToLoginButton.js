import { Link } from "react-router-dom"

export default function SwapToLogin({isOn, isFontLarge}) {
    return (
        <Link to="/logowanie" className="w-full mh-xs:w-1/2">
            {isOn === true ? (
                <button className="swap-button bg-blue-500 dark:bg-neutral-600 dark:text-neutral-100 text-white" disabled>
                    LOGOWANIE
                </button>
            ) : (
                <button className={`${isFontLarge ? "hover:text-2xl" : "hover:text-lg"} swap-button hover:ease-linear duration-75 mw-2xs:hover:text-sm`}>
                    LOGOWANIE
                </button>
            )}
        </Link>
    )
}