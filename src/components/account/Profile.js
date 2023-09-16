import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import axios from 'axios';

export default function Profile() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        phone_number: '',
    });

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        axios.get('http://localhost:5000/users/account_info', { headers })
            .then((response) => {
                const data = response.data;
                setUserData(data);
            })
            .catch((error) => {
                console.error('Błąd pobierania danych:', error);
            });
    }, []);

    return (
        <div className="flex items-center justify-center p-5 gradient-bg-color-only h-[80%]">
            <div className="w-[60%] max-w-screen-md bg-white rounded-lg shadow-xl p-6 flex relative">
                <div className="flex-shrink-0">
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
                <div className="ml-6">
                    <h2 className="text-3xl font-semibold mb-2">{userData.username}</h2>
                    <p className="text-lg font-medium">Adres e-mail: {userData.email}</p>
                    <p className="text-lg font-medium">Imię: {userData.firstname}</p>
                    <p className="text-lg font-medium">Nazwisko: {userData.lastname}</p>
                    <p className="text-lg font-medium">Numer telefonu: {userData.phone_number}</p>
                </div>
                <Link className="nav-link absolute top-1 right-1 bg-blue-500 text-white py-3 px-3 rounded-full hover:bg-blue-600 easy-linear duration-200 focus:outline-none" to="/edytuj-profil" data-tooltip-id='editProfileTooltip' data-tooltip-content="Edytuj dane konta">
                    <FaEdit size={18} />
                    <Tooltip id="editProfileTooltip" type="dark" effect="solid" delayShow={50} delayHide={100} />
                </Link>
                <Link className="nav-link absolute bottom-1 right-1 bg-red-500 text-white py-3 px-3 rounded-full hover:bg-red-600 easy-linear duration-200 focus:outline-none" to="/wyloguj" data-tooltip-id='logoutTooltip' data-tooltip-content="Wyloguj">
                    <BiLogOut size={23} />
                    <Tooltip id="logoutTooltip" type="dark" effect="solid" delayShow={50} delayHide={100} />
                </Link>
                <Link className="nav-link absolute bottom-1 right-14 bg-yellow-500 text-white py-3 px-3 rounded-full hover:bg-yellow-600 easy-linear duration-200 focus:outline-none" to="/zmien-haslo">
                    Zmień hasło
                </Link>
            </div>
        </div>
    )
}
