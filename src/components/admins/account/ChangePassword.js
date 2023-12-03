import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { ImArrowLeft } from 'react-icons/im';
import { arePasswordsIdentical, validatePassword } from '../authorization/utils/RegisterValidators';
import accountMsApi from "../../../services/accountMsApi";
import {successToast} from "../../../services/toastService";

export default function ChangePassword() {
    const [passwordData, setPasswordData] = useState({
        new_password: '',
        new_password_confirm: '',
    });

    const [errors, setErrors] = useState({
        new_password_confirmError: '',
        new_passwordError: '',
    });

    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

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

        // Otwórz modal potwierdzenia
        setIsConfirmationModalOpen(true);
    };

    const confirmUpdatePassword = () => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        accountMsApi.post('/admin/changepasswd', passwordData, { headers })
            .then(() => {
                setIsConfirmationModalOpen(false);
                localStorage.removeItem('accessToken');
                window.location = '/';
                successToast("Zmiana hasła zakończona sukcesem")
            })
            .catch((error) => {
                console.error('Błąd aktualizacji hasła:', error);
            });
    };


    return (
        <div className="flex items-center justify-center p-5 gradient-bg-color-only min-h-screen">
            <div className="w-50 max-w-screen-md bg-white dark:bg-neutral-600 rounded-lg shadow-xl p-6 flex flex-col relative">
                <Link
                    data-tooltip-id="backToProfile"
                    data-tooltip-content="Powrót do profilu"
                    to="/profil/admin"
                    className="absolute top-1 left-1"
                >
                    <Tooltip
                        id="backToProfile"
                        type="dark"
                        effect="solid"
                        delayShow={200}
                        delayHide={100}
                    />
                    <ImArrowLeft
                        size={30}
                        className="text-blue-500 hover:cursor-pointer hover:text-blue-700 ease-linear duration-100"
                    />
                </Link>
                <div className="flex-shrink-0 mx-auto mb-4">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
                <div className="mx-auto dark:text-neutral-300">
                    <div className="mb-4">
                        <label className="text-lg font-medium">Nowe hasło:</label>
                        <input
                            type="password"
                            name="new_password"
                            value={passwordData.new_password}
                            onChange={handleInputChange}
                            className="border p-2 rounded-lg w-full outline-none border-gray-500 focus:border-2 dark:border-neutral-100 dark:bg-neutral-300/30 dark:text-neutral-100"
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
                            className="border p-2 rounded-lg w-full outline-none border-gray-500 focus:border-2 dark:border-neutral-100 dark:bg-neutral-300/30 dark:text-neutral-100"
                        />
                        {errors.new_password_confirmError && (
                            <span className="text-red-500 text-lg">{errors.new_password_confirmError}</span>
                        )}
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        className="bg-green-500 dark:bg-green-800 dark:hover:bg-green-700 text-white py-3 px-6 rounded-full hover:bg-green-600 easy-linear duration-200 focus:outline-none"
                        onClick={handleUpdatePassword}
                    >
                        Zmień hasło
                    </button>
                </div>

                {isConfirmationModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white dark:bg-neutral-600 w-4/5 md:w-1/2 xl:w-1/3 rounded-lg shadow-md p-8 opacity-100">
                            <p className="text-lg dark:text-neutral-50 font-semibold mb-4 text-center">
                                Czy na pewno chcesz zmienić hasło?
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="text-white bg-red-500 hover:bg-red-700 dark:bg-red-400 dark:hover:bg-red-700 py-2 px-4 rounded-md ease-linear duration-100"
                                    onClick={confirmUpdatePassword}
                                >
                                    Tak, zmień hasło
                                </button>
                                <button
                                    className="text-white bg-blue-500 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 py-2 px-4 rounded-md ease-linear duration-100"
                                    onClick={setIsConfirmationModalOpen(false)}
                                >
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
