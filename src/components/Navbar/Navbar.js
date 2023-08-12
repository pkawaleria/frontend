import '../../assets/styles/navbar/navbar.css';
import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/logo.png';
import { FaHome } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';
import { Tooltip } from 'react-tooltip';

export default function Navbar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, visible]);

    return (
        <nav className={`navbar navbar-expand-md navbar-dark bg-custom-blue sticky-top${visible ? ' navbar-show' : ' navbar-hidden'}`}>
            <div className="container mx-auto flex justify-between items-center">
                <a className="logo-container" href="/" data-tooltip-id='home' data-tooltip-content="Strona Głowna">
                    <img src={Logo} alt="..." width="60" />
                    <Tooltip id="home" type="dark" effect="solid" />
                </a>
                <button className="navbar-toggler md:hidden" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="hidden md:flex items-center space-x-4">
                    <a className="nav-link" href="/" data-tooltip-id='homeTooltip' data-tooltip-content="Strona Głowna">
                        <FaHome size={35} className="icon-hover" />
                        <Tooltip id="homeTooltip" type="dark" effect="solid" />
                    </a>
                    <a className="nav-link" href="/login" data-tooltip-id='accountTooltip' data-tooltip-content="Moje konto">
                        <BiUser size={35} className="icon-hover" />
                        <Tooltip id="accountTooltip" type="dark" effect="solid" />
                    </a>
                </div>
            </div>
        </nav>
    );
};