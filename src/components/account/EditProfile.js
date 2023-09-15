import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { validateUsername, validateEmail, validateFirstname, validateLastname, validatePhoneNumber } from '../authorization/utils/RegisterValidators'

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

    const [errors, setErrors] = useState({
        usernameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        firstnameError: "",
        lastnameError: "",
        phone_numberError: ""
    })

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        axios.get('http://localhost:5000/users/account_info', { headers })
            .then((response) => {
                const data = response.data;
                setUserData(data);
                setUpdatedUserData(data);
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

        if (hasErrors()) {
            return;
        }
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        axios.post('http://localhost:5000/users/account_info', updatedUserData, { headers })
            .then((response) => {
                console.log('Dane zaktualizowane pomyślnie:', response.data);
                setUserData(updatedUserData);
                window.location = "/profil"
            })
            .catch((error) => {
                console.error('Błąd aktualizacji danych:', error);
            });
    };

    return (
        <div className="flex items-center justify-center p-5 gradient-bg-color-only h-[80%]">
            <div className="w-[50%] max-w-screen-md bg-white rounded-lg shadow-xl p-6 flex relative">
                <div className="flex-shrink-0">
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
                <div className="ml-6">
                    <div className="mb-4">
                        <label className="text-lg font-medium">Nazwa użytkownika:</label>
                        <input
                            type="text"
                            name="username"
                            value={updatedUserData.username}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    {errors.usernameError && (
                        <span className="text-red-500 text-lg">{errors.usernameError}</span>
                    )}
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Adres e-mail:</label>
                        <input
                            type="text"
                            name="email"
                            value={updatedUserData.email}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    {errors.emailError && (
                        <span className="text-red-500 text-lg">{errors.emailError}</span>
                    )}
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Imię:</label>
                        <input
                            type="text"
                            name="firstname"
                            value={updatedUserData.firstname}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    {errors.firstnameError && (
                        <span className="text-red-500 text-lg">{errors.firstnameError}</span>
                    )}
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Nazwisko:</label>
                        <input
                            type="text"
                            name="lastname"
                            value={updatedUserData.lastname}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    {errors.lastnameError && (
                        <span className="text-red-500 text-lg">{errors.lastnameError}</span>
                    )}
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Numer telefonu:</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={updatedUserData.phone_number}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    {errors.phone_numberError && (
                        <span className="text-red-500 text-lg">{errors.phone_numberError}</span>
                    )}
                </div>

                <div className="flex justify-end w-full mt-4">
                    <button className="nav-link absolute bottom-1 right-1 bg-green-500 text-white py-3 px-4 rounded-full hover:bg-green-600 easy-linear duration-200 focus:outline-none" onClick={handleUpdateProfile}>
                        Aktualizuj
                    </button>
                </div>
            </div>
        </div>
    )
}
