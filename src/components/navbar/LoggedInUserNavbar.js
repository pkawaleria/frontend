import "../../assets/styles/navbar/navbar.css";
import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/images/logo.png";
import { BiUser, BiFontSize } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { useFontSize } from "../themes/FontSizeContext";
import { FiAlignLeft, FiAlignRight } from "react-icons/fi";
import { BiSolidCategory, BiSolidCategoryAlt, BiSolidMoon } from "react-icons/bi";
import { PiSunFill } from "react-icons/pi";
import { RiMenuAddFill } from "react-icons/ri";

export default function LoggedInUserNavbar({ userFirstName }) {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isHoveredAds, setHoveredAds] = useState(false);
    const [isHoveredCat, setHoveredCat] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const { fontSize, toggleFontSize } = useFontSize();
    const dropdownRef = useRef(null);

    const style = {
        fontSize:
            fontSize === "small"
                ? "16px"
                : fontSize === "medium"
                    ? "24px"
                    : "24px",
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [prevScrollPos, visible, isDropdownOpen]);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(
            prevScrollPos > currentScrollPos || currentScrollPos < 50
        );
        setPrevScrollPos(currentScrollPos);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav
            className={`h-[10%] navbar navbar-expand-md navbar-dark sticky top-0 ${visible ? " navbar-show" : " navbar-hidden"
                }`}
            style={{ zIndex: 2, ...style }}
        >
            <div className="border-2 border-white rounded-md bg-custom-blue shadow-3xl w-2/3 mx-auto my-5 flex items-center">
                <Link
                    className="w-[10%] text-center mx-auto"
                    to="/"
                    data-tooltip-id="home"
                    data-tooltip-content="Strona Głowna">
                    <img
                        src={Logo}
                        alt="..."
                        className="navbar-logo mx-auto"
                    />
                    <Tooltip
                        id="home"
                        type="dark"
                        effect="solid"
                        delayShow={200}
                        delayHide={50}
                    />
                </Link>

                <div className="flex justify-evenly w-[15%]">
                    <Link
                        className="text-center mx-auto relative"
                        to="/"
                        data-tooltip-id="advertisements"
                        data-tooltip-content="Ogłoszenia"
                        onMouseEnter={() => setHoveredAds(true)}
                        onMouseLeave={() => setHoveredAds(false)}>
                        <FiAlignLeft
                            className={`text-[3vw] transition-transform transform-gpu ${isHoveredAds ? "opacity-0 text-white" : "opacity-100 text-white"
                                }`} />
                        <FiAlignRight
                            className={`text-[3vw] text-white absolute top-0 transition-transform transform-gpu ${isHoveredAds ? "opacity-100 text-white" : "opacity-0"
                                }`} />
                        <Tooltip
                            id="advertisements"
                            type="dark"
                            effect="solid"
                            delayShow={50}
                            delayHide={50}
                        />
                    </Link>

                    <Link
                        className="text-center mx-auto relative"
                        to="/kategorie"
                        data-tooltip-id="categories"
                        data-tooltip-content="Kategorie"
                        onMouseEnter={() => setHoveredCat(true)}
                        onMouseLeave={() => setHoveredCat(false)}>
                        <BiSolidCategory
                            className={`text-[3vw] text-white transition-transform transform-gpu ${isHoveredCat ? "opacity-0 text-white" : "opacity-100"
                                }`}
                            style={{ color: "white" }}
                        />
                        <BiSolidCategoryAlt
                            className={`text-[3vw] text-white mx-auto absolute top-0 transition-transform transform-gpu ${isHoveredCat ? "opacity-100 text-white" : "opacity-0"
                                }`}
                            style={{ color: "white" }}
                        />
                        <Tooltip
                            id="categories"
                            type="dark"
                            effect="solid"
                            delayShow={50}
                            delayHide={50}
                        />
                    </Link>
                </div>

                <h1 className="text-white font-bold text-[2.5vw] w-[50%] text-center">
                    Ogłoszeniowo
                </h1>

                <div className="w-[25%] flex flex-row mx-auto" ref={dropdownRef}>
                    <div className="w-[100%] text-white grid grid-flow-col">
                        <div className=" justify-evenly border-t-0 border-l-0 border-b-0 border-r-white border flex">
                            <Link
                                className="nav-link text-white"
                                data-tooltip-id="darkModeController"
                                data-tooltip-content="Zmień tryb strony">
                                <PiSunFill className="mx-auto icon-hover text-[2.5vw] ease-linear duration-100 hover:text-yellow-500" />
                                <Tooltip
                                    id="darkModeController"
                                    type="dark"
                                    effect="solid"
                                    delayShow={50}
                                    delayHide={50} />
                            </Link>
                            <Link
                                onClick={toggleFontSize}
                                className="nav-link text-white"
                                data-tooltip-id="fontTooltip"
                                data-tooltip-content="Zmień wielkość czcionki">
                                <BiFontSize className="mx-auto icon-hover text-[2.5vw] ease-linear duration-100 hover:text-red-600" />
                                <Tooltip
                                    id="fontTooltip"
                                    type="dark"
                                    effect="solid"
                                    delayShow={50}
                                    delayHide={50} />
                            </Link>
                        </div>
                        <div className="flex justify-evenly">
                            <Link
                                to="/nowe-ogloszenie"
                                className="nav-link text-white"
                                data-tooltip-id="newAd"
                                data-tooltip-content="Dodaj ogłoszenie">
                                <RiMenuAddFill className="mx-auto icon-hover text-[2.5vw] ease-linear duration-100 hover:text-blue-500" />
                                <Tooltip
                                    id="newAd"
                                    type="dark"
                                    effect="solid"
                                    delayShow={50}
                                    delayHide={50}
                                />
                            </Link>
                            <div
                                onClick={handleDropdownToggle}
                                className="relative cursor-pointer">
                                <BiUser
                                    className={`mx-auto icon-hover text-[2.5vw] ease-linear duration-100 hover:text-green-400 ${isDropdownOpen ? "text-green-400" : ""
                                        }`} />
                                {isDropdownOpen && (
                                    <div className="absolute top-11 right-0 bg-white rounded-md shadow-md w-[15rem] text-gray-700">
                                        <ul className="list-none p-2 cursor-default">
                                            <Link to="/profil"
                                                className="font-bold text-[1.1vw]">
                                                <li className="hover:bg-gray-300 px-3 py-2 ease-linear duration-100 cursor-pointer">
                                                    Twój profil ({userFirstName})
                                                </li>
                                            </Link>
                                            <hr className="border-0 h-[1px] bg-gray-300" />
                                            <Link
                                                to="/wyloguj"
                                                className="text-[1.1vw]"
                                                onClick={() => setDropdownOpen(false)}>
                                                <li className="hover:bg-gray-300 px-3 py-2 ease-linear duration-100 cursor-pointer">
                                                    Wyloguj się
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
