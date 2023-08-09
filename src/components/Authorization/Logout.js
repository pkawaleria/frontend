import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        console.log('Logged out successfully');
        window.location = "/";
    };


    return (
        <a className="nav-item nav-link" href="/" onClick={handleLogout}>
            Logout
        </a>
    );
};

export default Logout;