import { Link } from "react-router-dom"

export default function SwapToUserLogin({isOn}) {
    return (
        <Link to="/logowanie" className="w-full mh-xs:w-1/2">
            {isOn === true ? (
                <button className="swap-button bg-blue-500 dark:bg-neutral-600 dark:text-neutral-100 text-white" disabled>
                    LOGOWANIE (Użytkownika)
                </button>
            ) : (
                <button className="swap-button hover:ease-linear hover:text-blue-500 dark:hover:text-neutral-100 hover:text-lg duration-75 mw-2xs:hover:text-sm">
                    LOGOWANIE (Użytkownika)
                </button>
            )
            }
        </Link>
    )
}