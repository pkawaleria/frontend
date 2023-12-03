import React, { useState } from "react"
import { Link } from "react-router-dom"
import { AiFillHome } from "react-icons/ai"
import SubmitButton from "./form/SubmitButton"
import Input from "./form/Input"
import { validateUsername, validateEmail, validatePassword, arePasswordsIdentical, validateFirstname, validateLastname, validatePhoneNumber } from "./utils/RegisterValidators"
import { inputs } from "./utils/RegisterInputs"
import accountMsApi from "../../../services/accountMsApi";

export default function AdminRegister() {
    const [newUserData, setNewUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        phone_number: ""
    })

    const [errors, setErrors] = useState({
        usernameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        firstnameError: "",
        lastnameError: "",
        phone_numberError: ""
    })

    const handleInputChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value })
        let error = ""

        if (e.target.name === "username") {
            error = validateUsername(e.target.value)
            setErrors({ ...errors, "usernameError": error })
        }

        if (e.target.name === "email") {
            error = validateEmail(e.target.value)
            setErrors({ ...errors, "emailError": error })
        }

        if (e.target.name === "password") {
            error = validatePassword(e.target.value)
            setErrors({ ...errors, "passwordError": error })
        }

        if (e.target.name === "firstname") {
            error = validateFirstname(e.target.value)
            setErrors({ ...errors, "firstnameError": error })
        }

        if (e.target.name === "lastname") {
            error = validateLastname(e.target.value)
            setErrors({ ...errors, "lastnameError": error })
        }

        if (e.target.name === "phone_number") {
            error = validatePhoneNumber(e.target.value)
            setErrors({ ...errors, "phone_numberError": error })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            username: newUserData.username,
            email: newUserData.email,
            password: newUserData.password,
            confirmPassword: newUserData.confirmPassword,
            firstname: newUserData.firstname,
            lastname: newUserData.lastname,
            phone_number: newUserData.phone_number,
        };

        const error = arePasswordsIdentical(newUserData.password, newUserData.confirmPassword);
        if (error !== "") {
            setErrors({ ...errors, "confirmPasswordError": error });
            return;
        } else {
            setErrors({ ...errors, "confirmPasswordError": error });
        }

        try {
            const response = await accountMsApi.post('/admin/register', requestData);

            if (response.status === 200) {
                window.location.href = "/logowanie";
            } else {
            }
        } catch (error) {
            console.error('Błąd podczas rejestracji:', error);
        }
    };

    return (
        <div className="flex items-center mt-10 pb-3 justify-center gradient-bg-color-only">
            <div className="group">
                <Link to="/">
                    <AiFillHome
                        className="absolute top-6 left-8 text-5xl rounded text-white bg-blue-600/15 hover:bg-transparent hover:border-b-4 hover:cursor-pointer transition-colors duration-200
                                mw-xs:text-3xl mh-xs:text-3xl"/>
                </Link>
                <span className="group-hover:scale-100 home-tooltip">Strona główna</span>
            </div>
            <form
                className="bg-white py-5 px-8 rounded-md border-0 w-96 
                    mw-2xs:text-xs mh-xs:text-xs mh-xs:w-60 mh-xs:p-4 mw-2xs:p-3"
                onSubmit={handleSubmit}>
                
                {inputs.map((input) => (
                    <React.Fragment key={input.id}>
                        <Input
                            key={input.id}
                            {...input}
                            value={newUserData[input.name]}
                            onChange={handleInputChange} />
                        <span
                            className={`text-sm mt-1 ml-3 font-semibold text-red-500 ${errors[input.name + "Error"] ? 'block' : 'hidden'}`}>{errors[input.name + "Error"]}</span>
                    </React.Fragment>
                ))}
                <div className="flex space-x-4 mt-5 mw-2xs:mt-3">
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
}