import { Link } from "react-router-dom"

export default function SwapToRegister({isOn}) {
    return (
        <Link to="/rejestracja" className="w-full mh-xs:w-1/2">
            {isOn === true ? (
                <button className="swap-button bg-blue-500 text-white" disabled>
                    REJESTRACJA
                </button>
            ) : (
                <button className="swap-button">
                    REJESTRACJA
                </button>
            )
            }
        </Link>
    )
}