import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

export default function Profile() {
    const user = {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
    };

    return (
        <div className="flex items-center justify-center h-[500px] gradient-bg-color-only">
            <div className="w-[50%] max-w-screen-md bg-white rounded-lg shadow-md p-6 flex hover:cursor-pointer relative">
                <div className="flex-shrink-0">
                    <img
                        src='https://placekitten.com/207/207'
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
                <div className="ml-6">
                    <h2 className="text-3xl font-semibold mb-2">{user.username}</h2>
                    <p className="text-lg font-medium">Adres e-mail: {user.email}</p>
                </div>
                <Link className="nav-link absolute top-1 right-1 bg-blue-500 text-white py-3 px-3 rounded-full hover:bg-blue-600 focus:outline-none" to="/edytuj_profil" data-tooltip-id='editProfileTooltip' data-tooltip-content="Edytuj dane konta">
                    <FaEdit size={18} className="m-auto icon-hover text-white text-4xl hover:text-[44px] ease-linear duration-200" />
                    <Tooltip id="editProfileTooltip" type="dark" effect="solid" delayShow={200} delayHide={100} />
                </Link>
            </div>
        </div>
    );
}
