import '../../assets/styles/navbar/navbar.css';
import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/logo.png';
import { BiUser, BiFontSize } from 'react-icons/bi';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import { useFontSize } from "../../components/themes/FontSizeContext"

export default function Navbar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const { fontSize, toggleFontSize } = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, visible]);

    return (
        <nav className={`h-[10%] navbar navbar-expand-md navbar-dark sticky top-0 ${visible ? ' navbar-show' : ' navbar-hidden'}`} style={{ zIndex: 2, ...style }}>

            <div className=" border-2 border-white rounded-md bg-custom-blue shadow-3xl w-2/3 mx-auto my-5 flex  items-center">
                <Link className="w-[10%] text-center" to="/" data-tooltip-id='home' data-tooltip-content="Strona Głowna">
                    <img src={Logo} alt="..." className='navbar-logo' />
                    <Tooltip id="home" type="dark" effect="solid" delayShow={200} delayHide={50} />
                </Link>

                <h1 className='text-white font-bold text-[2.5vw] w-[80%] text-center'>Ogłoszeniowo</h1>

                <div className="w-[10%] flex items-center">
                    <Link onClick={toggleFontSize} className="nav-link w-full" data-tooltip-id='fontTooltip' data-tooltip-content="Zmień wielkość czcionki">
                        <BiFontSize className="m-auto icon-hover text-white text-[2.5vw] hover:text-[3vw] ease-linear duration-200" />
                        <Tooltip id="fontTooltip" type="dark" effect="solid" delayShow={200} delayHide={100} />
                    </Link>
                </div>

                <div className="w-[10%] flex items-center">
                    <Link className="nav-link w-full" to="/logowanie" data-tooltip-id='accountTooltip' data-tooltip-content="Moje konto">
                        <BiUser className="m-auto icon-hover text-white text-[2.5vw] hover:text-[3vw] ease-linear duration-200" />
                        <Tooltip id="accountTooltip" type="dark" effect="solid" delayShow={200} delayHide={100} />
                    </Link>
                </div>

            </div>
        </nav>
    );
};