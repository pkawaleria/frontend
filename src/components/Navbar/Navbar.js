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
        <nav className={`navbar navbar-expand-md navbar-dark bg-custom-blue sticky-top${visible ? ' navbar-show' : ' navbar-hidden'}`}>
            <div className="border-2 border-white border-opacity-70 rounded-md shadow-3xl w-2/3 mx-auto flex justify-between items-center ">
                <Link className="navbar-logo" to="/" data-tooltip-id='home' data-tooltip-content="Strona Głowna">
                    <img src={Logo} alt="..." className='object-hover w-16' />
                    <Tooltip id="home" type="dark" effect="solid" delayShow={200} delayHide={50}/>
                </Link>
                <div className="flex items-center space-x-4 mr-2">
                    <Link className="nav-link" to="/logowanie" data-tooltip-id='accountTooltip' data-tooltip-content="Moje konto">
                        <BiUser className="m-auto icon-hover text-white text-4xl hover:text-[44px] ease-linear duration-200" />
                        <Tooltip id="accountTooltip" type="dark" effect="solid" delayShow={200} delayHide={100}/>
                    </Link>
                </div>
            </div>
        </nav>
    );
};