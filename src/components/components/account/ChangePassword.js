import React, { useState } from 'react';
import axios from 'axios';
import { arePasswordsIdentical, validatePassword } from '../authorization/utils/RegisterValidators';

export default function ChangePassword() {
    const [passwordData, setPasswordData] = useState({
        new_password: '',
        new_password_confirm: '',
    });

    const [errors, setErrors] = useState({
        new_password_confirmError: '',
        new_passwordError: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';

        if (name === 'new_password_confirm') {
            error = arePasswordsIdentical(passwordData.new_password, value);
        } else if (name === 'new_password') {
            error = validatePassword(value);
        }

        setErrors({
            ...errors,
            [name + 'Error']: error,
        });
    };

    const hasErrors = () => {
        return Object.values(errors).some((error) => error !== '');
    };

    const handleUpdatePassword = () => {
        if (hasErrors()) {
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        axios.post(process.env.REACT_APP_ACCOUNTING_MS_USERS_CHANGE_PASSWORD, passwordData, { headers })
            .then((response) => {
                console.log('Hasło zaktualizowane pomyślnie:', response.data);
                localStorage.removeItem('accessToken');
                window.location = '/';
            })
            .catch((error) => {
                console.error('Błąd aktualizacji hasła:', error);
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
                        <label className="text-lg font-medium">Nowe hasło:</label>
                        <input
                            type="password"
                            name="new_password"
                            value={passwordData.new_password}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    {errors.new_passwordError && (
                        <span className="text-red-500 text-lg">{errors.new_passwordError}</span>
                    )}
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Powtórz nowe hasło:</label>
                        <input
                            type="password"
                            name="new_password_confirm"
                            value={passwordData.new_password_confirm}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                        {errors.new_password_confirmError && (
                            <span className="text-red-500 text-lg">{errors.new_password_confirmError}</span>
                        )}
                    </div>
                </div>

                <div className="flex justify-end w-full mt-4">
                    <button className="nav-link absolute bottom-1 right-1 bg-green-500 text-white py-3 px-4 rounded-full hover:bg-green-600 easy-linear duration-200 focus:outline-none" onClick={handleUpdatePassword}>
                        Zmień hasło
                    </button>
                </div>
            </div>
        </div>
    );
}
