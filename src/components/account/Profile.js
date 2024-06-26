import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import axios from 'axios';
import { formatPhoneNumber } from './utils/ProfileInputFormat';
import { useFontSize } from "../fontSize/FontSizeContext"

export default function Profile() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        phone_number: '',
    });

    const {isFontLarge} = useFontSize();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        axios.get(process.env.REACT_APP_ACCOUNTING_MS_USERS_ACCOUNT, { headers })
            .then((response) => {
                const data = response.data;
                const formattedPhoneNumber = formatPhoneNumber(data.phone_number);
                setUserData({ ...data, phone_number: formattedPhoneNumber });
            })
            .catch((error) => {
                console.error('Błąd pobierania danych:', error);
            });
    }, []);

    return (
        <div className="flex flex-col items-center p-5 gradient-bg-color-only min-h-screen">
            <nav className="flex flex-col justify-center w-50 md:w-[50%] bg-blue-500 dark:bg-neutral-600 text-white p-4 rounded-t-lg mb-4">
                <Link to="/twoje-ogloszenia" 
                    className={`${isFontLarge ? "text-3xl" : "text-xl"} ease-linear duration-100 font-semibold hover:underline`}>Moje ogłoszenia</Link>
            </nav>
            <div className="w-[60%] max-w-screen-md bg-white dark:bg-neutral-600 rounded-lg shadow-xl p-6 relative">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <img
                            src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
                            alt="User Avatar"
                            className="w-32 h-32 rounded-full object-cover" />
                    </div>
                    <div className="ml-6 md:ml-6 dark:text-neutral-100">
                        <p className={`${isFontLarge ? "text-5xl" : "text-3xl"} ease-linear duration-100 font-semibold mb-2`}>{userData.username}</p>
                        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Adres e-mail: {userData.email}</p>
                        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Imię: {userData.firstname}</p>
                        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Nazwisko: {userData.lastname}</p>
                        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Numer telefonu: {userData.phone_number}</p>
                    </div>
                </div>
                <div className="flex items-center self-center mt-4">
                    <Link to="/edytuj-profil"
                        className={`
                        ${isFontLarge ? "text-2xl" : "text-base"}
                        nav-link absolute top-1 right-1 bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-700 text-white py-3 px-3 rounded-full hover:bg-blue-600 easy-linear duration-200 focus:outline-none`}
                        data-tooltip-id='editProfileTooltip'
                        data-tooltip-content="Edytuj dane konta">
                        <FaEdit className={`${isFontLarge ? "text-3xl" : "text-lg"} ease-linear duration-100`}/>
                        <Tooltip 
                            id="editProfileTooltip" 
                            type="dark" 
                            effect="solid" 
                            delayShow={50} 
                            delayHide={100} />
                    </Link>
                    <Link to="/zmien-haslo"
                        className={`${isFontLarge ? "text-xl" : "text-sm"} nav-link absolute bottom-1 right-12 bg-yellow-500 dark:bg-yellow-700 dark:hover:bg-yellow-600 text-white py-[10px] px-[10px] rounded-full hover:bg-yellow-600 easy-linear duration-200 focus:outline-none`} >
                        Zmień hasło
                    </Link>
                    <Link to="/wyloguj" 
                        className={`
                        ${isFontLarge ? "text-2xl" : "text-base"}
                        nav-link absolute bottom-1 right-1 bg-red-500 dark:bg-red-900 dark:hover:bg-red-800 text-white py-3 pr-3 pl-2 rounded-full hover:bg-red-800 easy-linear duration-200 focus:outline-none`} 
                        data-tooltip-id='logoutTooltip' 
                        data-tooltip-content="Wyloguj się">
                        <BiLogOut className={`${isFontLarge ? "text-3xl" : "text-lg"}`}/>
                        <Tooltip id="logoutTooltip" type="dark" effect="solid" delayShow={50} delayHide={100} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
