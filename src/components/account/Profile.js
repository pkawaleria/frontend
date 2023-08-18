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
        <div className="flex items-center justify-center gradient-bg-color-only h-[80%]">
            <div className="w-[50%] max-w-screen-md bg-white rounded-lg shadow-xl p-6 flex relative">
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
                <Link className="nav-link absolute top-1 right-1 bg-blue-500 text-white py-3 px-3 rounded-full hover:bg-blue-600 easy-linear duration-200 focus:outline-none" to="/edytuj-profil" data-tooltip-id='editProfileTooltip' data-tooltip-content="Edytuj dane konta">
                    <FaEdit size={18}/>
                    <Tooltip id="editProfileTooltip" type="dark" effect="solid" delayShow={50} delayHide={100} />
                </Link>
            </div>
        </div>
    )
}
