import React, { useState } from "react"
import { AiFillHome } from "react-icons/ai"

import SubmitButton from "./form/SubmitButton"
import SwapToRegisterButton from "./form/SwapToRegisterButton"
import SwapToLoginButton from "./form/SwapToLoginButton"
import Input from "./form/Input"

import { validateUsername, validateEmail, validatePassword, arePasswordsIdentical } from "./utils/RegisterValidators"
import { inputs } from "./utils/RegisterInputs"

export default function Register() {
    const [newUserData, setNewUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({
        usernameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: ""
    })

    const handleInputChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value })
        let error = ""

        if (e.target.name === "username") {
            error = validateUsername(e.target.value)
            setErrors({...errors, "usernameError": error})
        }

        if (e.target.name === "email") {
            error = validateEmail(e.target.value)
            setErrors({...errors, "emailError": error})
        }

        if (e.target.name === "password") {
            error = validatePassword(e.target.value)
            setErrors({...errors, "passwordError": error})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const error = arePasswordsIdentical(newUserData.password, newUserData.confirmPassword)
        if (error !== "") {
            setErrors({...errors, "confirmPasswordError": error})
            return
        } else {
            setErrors({...errors, "confirmPasswordError": error})
        }

        // TODO Dodanie obsługi endpointu do rejestracji
    }

    return (
        <div className="flex items-center justify-center h-screen linear gradient-bg">
            <div className="group">
                <AiFillHome 
                    onClick={() => window.location = "/"} 
                    className="absolute top-6 left-8 text-5xl rounded text-white bg-blue-600/15 hover:bg-transparent hover:border-b-4 hover:cursor-pointer transition-colors duration-200
                                mw-xs:text-3xl mh-xs:text-3xl"/>
                <span className="group-hover:scale-100 home-tooltip">Strona główna</span>
            </div>
            <form 
                className="bg-white py-5 px-8 rounded-md border-0 border-blue-600 w-96 
                    mw-2xs:text-xs mh-xs:text-xs mh-xs:w-60 mh-xs:p-4" 
                    onSubmit={handleSubmit}>
                <div className="flex">
                    <SwapToRegisterButton isOn={true} />
                    <SwapToLoginButton />
                </div>
                {inputs.map((input) => (
                    <React.Fragment key={input.id}>
                        <Input
                            key={input.id}
                            {...input}
                            value={newUserData[input.name]}
                            onChange={handleInputChange}
                        />
                        <span
                            className={`text-sm mt-1 ml-3 font-semibold text-red-500 ${errors[input.name + "Error"] ? 'block' : 'hidden'}`}>{errors[input.name + "Error"]}</span>
                    </React.Fragment>
                ))}
                <div className="flex space-x-4 mt-5">
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
}