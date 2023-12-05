import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { ImArrowLeft } from 'react-icons/im';
import { validateUsername, validateEmail, validateFirstname, validateLastname, validatePhoneNumber } from '../authorization/utils/RegisterValidators';
import { useFontSize } from "../fontSize/FontSizeContext"

export default function EditProfile() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        phone_number: '',
    });

    const [updatedUserData, setUpdatedUserData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        phone_number: '',
    });

    const [originalUserData, setOriginalUserData] = useState({});
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const { isFontLarge } = useFontSize();

    const [errors, setErrors] = useState({
        usernameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        firstnameError: '',
        lastnameError: '',
        phone_numberError: '',
    });

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        axios.get(process.env.REACT_APP_ACCOUNTING_MS_USERS_ACCOUNT, { headers })
            .then((response) => {
                const data = response.data;
                setUserData(data);
                setUpdatedUserData(data);
                setOriginalUserData(data);
            })
            .catch((error) => {
                console.error('Błąd pobierania danych:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({
            ...updatedUserData,
            [name]: value,
        });

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';

        if (name === 'username') {
            error = validateUsername(value);
        } else if (name === 'email') {
            error = validateEmail(value);
        } else if (name === 'firstname') {
            error = validateFirstname(value);
        } else if (name === 'lastname') {
            error = validateLastname(value);
        } else if (name === 'phone_number') {
            error = validatePhoneNumber(value);
        }

        setErrors({
            ...errors,
            [name + 'Error']: error,
        });
    };

    const hasErrors = () => {
        return Object.values(errors).some((error) => error !== '');
    };

    const handleUpdateProfile = () => {
        if (originalUserData !== updatedUserData) {
            if (hasErrors()) {
                return;
            }
            // Otwórz modal potwierdzenia
            setIsConfirmationModalOpen(true);
        } else {
            window.location = '/profil';
        }
    };

    const confirmUpdateProfile = () => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        axios.post(process.env.REACT_APP_ACCOUNTING_MS_USERS_ACCOUNT, updatedUserData, { headers })
            .then((response) => {
                console.log('Dane zaktualizowane pomyślnie:', response.data);
                setUserData(updatedUserData);
                setIsConfirmationModalOpen(false);
                window.location = '/profil';
            })
            .catch((error) => {
                console.error('Błąd aktualizacji danych:', error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center p-5 gradient-bg-color-only min-h-screen">
            <div className="w-50 max-w-screen-md bg-white dark:bg-neutral-600 rounded-lg shadow-xl p-6 flex flex-col relative mt-5">
                <Link
                    to="/profil"
                    className={`${isFontLarge ? "text-2xl" : "text-lg"} absolute top-2 left-2`}
                    data-tooltip-id="backToProfile"
                    data-tooltip-content="Powrót do profilu">
                    <ImArrowLeft
                        className={`${isFontLarge ? "text-4xl" : "text-3xl"} text-blue-500 hover:cursor-pointer hover:text-blue-700 ease-linear duration-100 m-1`} />
                    <Tooltip
                        id="backToProfile"
                        type="dark"
                        effect="solid"
                        delayShow={50}
                        delayHide={50} />
                </Link>
                <div className="flex-shrink-0 mx-auto mb-4">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover" />
                </div>
                <div className="mx-auto dark:text-neutral-300">
                    <div className="mb-4">
                        <label className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Nazwa użytkownika:</label>
                        <input
                            type="text"
                            name="username"
                            value={updatedUserData.username}
                            onChange={handleInputChange}
                            className={`
                            ${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100
                            border p-2 rounded-lg w-full outline-none 
                            border-gray-500 focus:border-2 dark:border-neutral-100
                            dark:bg-neutral-300/30 dark:text-neutral-100`} />
                    </div>
                    {errors.usernameError && (
                        <span className={`${isFontLarge ? "text-xl" : "text-lg"} ease-linear duration-100 text-red-500`}>{errors.usernameError}</span>
                    )}
                    <div className="mb-4">
                        <label className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Adres e-mail:</label>
                        <input
                            type="text"
                            name="email"
                            value={updatedUserData.email}
                            onChange={handleInputChange}
                            className={`
                            ${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100
                            border p-2 rounded-lg w-full outline-none 
                            border-gray-500 focus:border-2 dark:border-neutral-100
                             dark:bg-neutral-300/30 dark:text-neutral-100`} />
                    </div>
                    {errors.emailError && (
                        <span className={`${isFontLarge ? "text-xl" : "text-lg"} ease-linear duration-100 text-red-500`}>{errors.emailError}</span>
                    )}
                    <div className="mb-4">
                        <label className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Imię:</label>
                        <input
                            type="text"
                            name="firstname"
                            value={updatedUserData.firstname}
                            onChange={handleInputChange}
                            className={`
                            ${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100
                            border p-2 rounded-lg w-full outline-none 
                            border-gray-500 focus:border-2 dark:border-neutral-100
                            dark:bg-neutral-300/30 dark:text-neutral-100`} />
                    </div>
                    {errors.firstnameError && (
                        <span className={`${isFontLarge ? "text-xl" : "text-lg"} ease-linear duration-100 text-red-500`}>{errors.firstnameError}</span>
                    )}
                    <div className="mb-4">
                        <label className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Nazwisko:</label>
                        <input
                            type="text"
                            name="lastname"
                            value={updatedUserData.lastname}
                            onChange={handleInputChange}
                            className={`
                            ${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100
                            border p-2 rounded-lg w-full outline-none 
                            border-gray-500 focus:border-2 dark:border-neutral-100
                            dark:bg-neutral-300/30 dark:text-neutral-100`} />
                    </div>
                    {errors.lastnameError && (
                        <span className={`${isFontLarge ? "text-xl" : "text-lg"} ease-linear duration-100 text-red-500`}>{errors.lastnameError}</span>
                    )}
                    <div className="mb-4">
                        <label className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Numer telefonu:</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={updatedUserData.phone_number}
                            onChange={handleInputChange}
                            className={`
                            ${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100
                            border p-2 rounded-lg w-full outline-none 
                            border-gray-500 focus:border-2 dark:border-neutral-100
                            dark:bg-neutral-300/30 dark:text-neutral-100`}/>
                    </div>
                    {errors.phone_numberError && (
                        <span className={`${isFontLarge ? "text-xl" : "text-lg"} ease-linear duration-100 text-red-500`}>{errors.phone_numberError}</span>
                    )}
                </div>

                <div className="flex justify-end w-full">
                    <button 
                        className={`
                        ${isFontLarge ? "text-2xl" : "text-base"}
                        nav-link bg-green-500 dark:bg-green-800 hover:dark:bg-green-700 
                        text-white py-3 px-4 rounded-full hover:bg-green-600 
                        easy-linear duration-100 focus:outline-none`} 
                        onClick={handleUpdateProfile}>
                        Aktualizuj
                    </button>
                </div>

                {/* Modal potwierdzający przed aktualizacją danych */}
                {isConfirmationModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white dark:bg-neutral-600 w-[50%] md:w-1/2 lg:w-1/3 rounded-lg shadow-md p-8 opacity-100">
                            <p className={`${isFontLarge ? "text-3xl" : "text-lg"} dark:text-neutral-200 font-semibold mb-4 text-center`}>Czy na pewno chcesz zaktualizować dane?</p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className={`${isFontLarge ? "text-2xl" : "text-base"} text-white bg-green-500 hover:bg-green-700 dark:bg-green-900 dark:hover:bg-green-700 ease-linear duration-100 py-2 px-4 rounded-md`}
                                    onClick={confirmUpdateProfile}>
                                    Tak, zaktualizuj dane
                                </button>
                                <button
                                    className={`${isFontLarge ? "text-2xl" : "text-base"} text-white bg-blue-500 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-700 ease-linear duration-100 py-2 px-4 rounded-md`}
                                    onClick={() => setIsConfirmationModalOpen(false)}>
                                    Anuluj
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
