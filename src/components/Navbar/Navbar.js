import '../../assets/styles/navbar/navbar.css';
import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/logo.png';
import { BiUser } from 'react-icons/bi';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

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
        <nav className={`w-4/5 m-auto navbar navbar-expand-md navbar-dark bg-custom-blue sticky-top${visible ? ' navbar-show' : ' navbar-hidden'}`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link className="navbar-logo" to="/" data-tooltip-id='home' data-tooltip-content="Strona Głowna">
                    <img src={Logo} alt="..." className='object-hover w-16' />
                    <Tooltip id="home" type="dark" effect="solid" />
                </Link>
                <div className="flex items-center space-x-4 mr-4">
                    <Link className="nav-link" href="/logowanie" data-tooltip-id='accountTooltip' data-tooltip-content="Moje konto">
                        <BiUser className="icon-hover text-white text-4xl hover:text-5xl ease-linear duration-200" />
                        <Tooltip id="accountTooltip" type="dark" effect="solid" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};