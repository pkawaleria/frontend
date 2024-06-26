import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import LoginButton from "./form/LoginButton";
import SwapToRegisterButton from "./form/SwapToRegisterButton";
import SwapToLoginButton from "./form/SwapToLoginButton";
import Input from "./form/Input";
import { validateField } from "./utils/LoginValidators";
import { inputs } from "./utils/LoginInputs";
import { loginUser } from "../../services/userService";
import { useFontSize } from "../fontSize/FontSizeContext"

export default function Login() {
    const [loginData, setLoginData] = useState({
        login: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        loginError: "",
        passwordError: "",
    });

    const {isFontLarge} = useFontSize();

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        let error = "";

        if (e.target.name === "login") {
            error = validateField(e.target.value, "Login nie może być pusty");
            setErrors({ ...errors, loginError: error });
        }

        if (e.target.name === "password") {
            error = validateField(e.target.value, "Hasło nie może być puste");
            setErrors({ ...errors, passwordError: error });
        }
    };

    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (isFormValid()) {
                handleSubmit(e);
            } else {
                setErrors({
                    loginError: loginData.login.trim() === "" ? "Login nie może być pusty" : "",
                    passwordError: loginData.password.trim() === "" ? "Hasło nie może być puste" : "",
                });
            }
        }
    };

    const isFormValid = () => {
        return (
            loginData.login.trim() !== "" &&
            loginData.password.trim() !== "" &&
            errors.loginError === "" &&
            errors.passwordError === ""
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser(loginData.login, loginData.password)
        if (success) {
            window.location.href = "/";
        }
    };

    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    useEffect(() => {
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

        themeCheck()
    }, [userTheme, systemTheme])

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
                className={`${isFontLarge ? "text-xl" : "text-base"} bg-white dark:bg-neutral-800 dark:border-white dark:border-2 py-5 px-8 rounded-md border-0 border-blue-600 w-96
                    mw-2xs:text-xs mh-xs:text-xs mh-xs:w-60 mh-xs:p-4`}
                onSubmit={handleSubmit}>
                <div className="flex">
                    <SwapToRegisterButton isFontLarge={isFontLarge} />
                    <SwapToLoginButton isOn={true} />
                </div>
                {inputs.map((input) => (
                    <React.Fragment key={input.id}>
                        <Input
                            isFontLarge={isFontLarge}
                            key={input.id}
                            {...input}
                            value={loginData[input.name]}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterPress}/>
                        <span className={`${isFontLarge ? "text-lg" : "text-sm"} mt-1 ml-3 font-semibold text-red-500 ${errors[input.name + "Error"] ? "block" : "hidden"}`}>
                            {errors[input.name + "Error"]}
                        </span>
                    </React.Fragment>
                ))}
                <div className="flex space-x-4 mt-5">
                    <LoginButton />
                </div>
                <div className="flex space-x-4 mt-5">
                    <Link className="login-button flex justify-center" to="/logowanie/admin">
                        Logowanie pracownika
                    </Link>
                </div>
            </form>
        </div>
    );
}
