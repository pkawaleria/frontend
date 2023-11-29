import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import SubmitButton from "./form/SubmitButton";
import SwapToRegisterButton from "./form/SwapToRegisterButton";
import SwapToLoginButton from "./form/SwapToLoginButton";
import Input from "./form/Input";
import axios from "axios";
import {
    validateUsername,
    validateEmail,
    validatePassword,
    arePasswordsIdentical,
    validateFirstname,
    validateLastname,
    validatePhoneNumber,
} from "./utils/RegisterValidators";
import { inputs } from "./utils/RegisterInputs";

export default function Register() {
    const [newUserData, setNewUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        phone_number: "",
    });

    const [errors, setErrors] = useState({
        usernameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        firstnameError: "",
        lastnameError: "",
        phone_numberError: "",
    });

    const handleInputChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
        let error = "";

        if (e.target.name === "username") {
            error = validateUsername(e.target.value);
            setErrors({ ...errors, usernameError: error });
        }

        if (e.target.name === "email") {
            error = validateEmail(e.target.value);
            setErrors({ ...errors, emailError: error });
        }

        if (e.target.name === "password") {
            error = validatePassword(e.target.value);
            setErrors({ ...errors, passwordError: error });
        }

        if (e.target.name === "firstname") {
            error = validateFirstname(e.target.value);
            setErrors({ ...errors, firstnameError: error });
        }

        if (e.target.name === "lastname") {
            error = validateLastname(e.target.value);
            setErrors({ ...errors, lastnameError: error });
        }

        if (e.target.name === "phone_number") {
            error = validatePhoneNumber(e.target.value);
            setErrors({ ...errors, phone_numberError: error });
        }
    };

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

        try {
            const response = await axios.post(
                process.env.REACT_APP_ACCOUNTING_MS_USERS_REGISTER,
                requestData
            );

            if (response.status === 200) {
                window.location.href = "/logowanie";
            } else {
            }
        } catch (error) {
            console.error("Błąd podczas rejestracji:", error);
        }
    };

    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const themeCheck = () => {
        if (userTheme === "dark" || (!userTheme && systemTheme)) {
            document.documentElement.classList.add("dark");
            document.body.style.backgroundColor = "rgb(38 38 38)";
            localStorage.setItem("theme", "dark")
            return;
        }
        document.body.style.backgroundColor = "rgb(25, 70, 113)";
        localStorage.setItem("theme", "light")
    }

    useEffect(() => {
        themeCheck()
    }, [])


    return (
        <div className="flex items-center justify-center h-screen linear gradient-bg-color-only">
            <div className="group">
                <Link to="/">
                    <AiFillHome
                        className="absolute top-6 left-8 text-5xl 
                        rounded text-white bg-blue-600/15 
                        hover:bg-transparent hover:border-b-4 
                        hover:cursor-pointer transition-colors 
                        duration-200 mw-xs:text-3xl mh-xs:text-3xl"/>
                </Link>
                <span className="group-hover:scale-100 home-tooltip">Strona główna</span>
            </div>
            <form
                className="bg-white dark:bg-neutral-800 dark:border-white dark:border-2 py-5 px-8 rounded-md border-0 w-96 
            mw-2xs:text-xs mh-xs:text-xs mh-xs:w-60 mh-xs:p-4 mw-2xs:p-3"
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
                            onKeyDown={handleEnterPress}
                        />
                        <span
                            className={`text-sm mt-1 ml-3 font-semibold text-red-500 ${errors[input.name + "Error"] ? "block" : "hidden"
                                }`}>
                            {errors[input.name + "Error"]}
                        </span>
                    </React.Fragment>
                ))}
                <div className="flex space-x-4 mt-5 mw-2xs:mt-3">
                    <SubmitButton />
                </div>
            </form>
        </div>
    );
}
