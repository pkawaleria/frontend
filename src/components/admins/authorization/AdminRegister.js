import React, { useState } from "react"
import SubmitButton from "./form/SubmitButton"
import Input from "./form/Input"
import { validateUsername, validateEmail, validatePassword, arePasswordsIdentical, validateFirstname, validateLastname, validatePhoneNumber } from "./utils/RegisterValidators"
import { inputs } from "./utils/RegisterInputs"
import accountMsApi from "../../../services/accountMsApi";

export default function AdminRegister({ isFontLarge }) {
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

    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (isFormValid()) {
                handleSubmit(e);
            } else {
                setErrors({
                    usernameError: validateUsername(newUserData.username),
                    emailError: validateEmail(newUserData.email),
                    passwordError: validatePassword(newUserData.password),
                    confirmPasswordError: validatePassword(newUserData.confirmPassword),
                    firstnameError: validateFirstname(newUserData.firstname),
                    lastnameError: validateLastname(newUserData.lastname),
                    phone_numberError: validatePhoneNumber(newUserData.phone_number),
                });
            }
        }
    };

    const isFormValid = () => {
        return (
            newUserData.username &&
            newUserData.email &&
            newUserData.password &&
            newUserData.confirmPassword &&
            newUserData.firstname &&
            newUserData.lastname &&
            newUserData.phone_number &&
            arePasswordsIdentical(newUserData.password, newUserData.confirmPassword)
        );
    };

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
        <div className="flex flex-col items-center justify-center my-5">
            <p className={`text-white dark:text-neutral-200 font-bold mb-4 text-center
            ${isFontLarge ? "text-[55px]" : "text-[40px]"} ease-linear duration-100`}>
                REJESTRACJA NOWEGO ADMINISTRATORA
            </p>
            <form
                className={`${isFontLarge ? "text-xl" : "text-base"} bg-white dark:bg-neutral-800 dark:border-white dark:border-2 py-5 px-8 rounded-md border-0 border-blue-600 w-96
                mw-2xs:text-xs mh-xs:text-xs mh-xs:w-60 mh-xs:p-4 mb-12`}
                onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <React.Fragment key={input.id}>
                        <Input
                            isFontLarge={isFontLarge}
                            key={input.id}
                            {...input}
                            value={newUserData[input.name]}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterPress} />
                        <p className={`${isFontLarge ? "text-lg" : "text-sm"} mt-1 ml-3 font-semibold text-red-500 ${errors[input.name + "Error"] ? "block" : "hidden"}`}>
                            {errors[input.name + "Error"]}
                        </p>
                    </React.Fragment>
                ))}
                <div className="flex space-x-4 mt-5 mw-2xs:mt-3">
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
}