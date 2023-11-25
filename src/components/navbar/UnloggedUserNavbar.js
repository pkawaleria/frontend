import "../../assets/styles/navbar/navbar.css";
import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.png";
import { BiFontSize } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { useFontSize } from "../themes/FontSizeContext";
import { FiAlignLeft, FiAlignRight, FiLogIn } from "react-icons/fi";
import { BiSolidCategory, BiSolidCategoryAlt } from "react-icons/bi";
import { PiSunFill } from "react-icons/pi";

export default function UnloggedUserNavbar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isHoveredAds, setHoveredAds] = useState(false);
    const [isHoveredCat, setHoveredCat] = useState(false);

    const { fontSize, toggleFontSize } = useFontSize();

    const style = {
        fontSize:
            fontSize === "small" ? "16px" : fontSize === "medium" ? "24px" : "24px",
    };

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos, visible]);

    return (
        <nav
            className={`h-[10%] navbar navbar-expand-md navbar-dark sticky top-0 ${visible ? " navbar-show" : " navbar-hidden"}`}
            style={{ zIndex: 2, ...style }}>
            <div className="border-2 border-white rounded-md bg-custom-blue shadow-3xl w-2/3 mx-auto my-5 flex items-center">
                <Link
                    className="w-[10%] text-center mx-auto"
                    to="/"
                    data-tooltip-id="home"
                    data-tooltip-content="Strona Głowna">
                    <img src={Logo} alt="..." className="navbar-logo mx-auto" />
                    <Tooltip
                        id="home"
                        type="dark"
                        effect="solid"
                        delayShow={200}
                        delayHide={50} />
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

                <div className="w-[25%] flex flex-row mx-auto">
                    <div className="w-[100%] text-white grid grid-flow-col">
                        <div className="justify-evenly border-t-0 border-l-0 border-b-0 border-r-white border flex">
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
                        <Link
                            className="nav-link text-white hover:text-green-400"
                            to="/logowanie"
                            data-tooltip-id="login"
                            data-tooltip-content="Zaloguj się">
                            <FiLogIn className="mx-auto icon-hover text-[2.5vw] ease-linear duration-100" />
                            <Tooltip
                                id="login"
                                type="dark"
                                effect="solid"
                                delayShow={50}
                                delayHide={50}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
