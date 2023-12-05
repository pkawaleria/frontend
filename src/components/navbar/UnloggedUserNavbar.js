import "../../assets/styles/navbar/navbar.css";
import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.png";
import { BiFontSize } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { useFontSize } from "../fontSize/FontSizeContext";
import { FiAlignLeft, FiAlignRight, FiLogIn } from "react-icons/fi";
import { BiSolidCategory, BiSolidCategoryAlt } from "react-icons/bi";
import { PiSunFill } from "react-icons/pi";
import { IoMoon } from "react-icons/io5";

export default function UnloggedUserNavbar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isHoveredAds, setHoveredAds] = useState(false);
    const [isHoveredCat, setHoveredCat] = useState(false);

    const { isFontLarge, toggleFont } = useFontSize();

    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const themeCheck = () => {
            if (userTheme === "dark" || (!userTheme && systemTheme)) {
                document.documentElement.classList.add("dark");
                document.body.style.backgroundColor = "rgb(38 38 38)";
                localStorage.setItem("theme", "dark")
                setDarkMode(true);
                return;
            }
            document.body.style.backgroundColor = "rgb(25, 70, 113)";
            localStorage.setItem("theme", "light")
            setDarkMode(false);
        }

        themeCheck()
    }, [userTheme, systemTheme])

    const toogleTheme = () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light")
            document.body.style.backgroundColor = "rgb(25, 70, 113)";
            setDarkMode(false);
            return;
        }
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        document.body.style.backgroundColor = "rgb(38 38 38)";
        setDarkMode(true);
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos, visible]);

    return (
        <nav 
            className={`h-[10%] navbar navbar-expand-md navbar-dark sticky top-0 ${visible ? " navbar-show" : " navbar-hidden"}`}
            style={{zIndex: 2}}>
            <div className="border-2 border-white rounded-md bg-custom-blue dark:bg-neutral-700 shadow-3xl w-2/3 mx-auto my-5 flex items-center">
                <Link
                    className={`w-[10%] text-center mx-auto ${isFontLarge ? "text-2xl" : " text-base"}`}
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
                        className={`text-center mx-auto relative ${isFontLarge ? "text-2xl" : " text-base"}`}
                        to="/aukcje/szukaj"
                        data-tooltip-id="advertisements"
                        data-tooltip-content="Ogłoszenia"
                        onMouseEnter={() => setHoveredAds(true)}
                        onMouseLeave={() => setHoveredAds(false)}>
                        <FiAlignLeft
                            className={`text-[3vw] transition-transform transform-gpu ease-linear duration-100
                            ${isHoveredAds ? "opacity-0 text-white" : "opacity-100 text-white"}
                            ${isFontLarge ? "text-[4vw]" : "text-[3vw]"} ease-linear duration-100`} />
                        <FiAlignRight
                            className={`text-[3vw] text-white absolute top-0 transition-transform transform-gpu ease-linear duration-100
                            ${isHoveredAds ? "opacity-100 text-white" : "opacity-0"}
                            ${isFontLarge ? "text-[4vw]" : "text-[3vw]"} ease-linear duration-100`} />
                        <Tooltip
                            id="advertisements"
                            type="dark"
                            effect="solid"
                            delayShow={50}
                            delayHide={50}/>
                    </Link>

                    <Link
                        className={`text-center mx-auto relative ${isFontLarge ? "text-2xl" : " text-base"}`}
                        to="/kategorie"
                        data-tooltip-id="categories"
                        data-tooltip-content="Kategorie"
                        onMouseEnter={() => setHoveredCat(true)}
                        onMouseLeave={() => setHoveredCat(false)}>
                        <BiSolidCategory
                            className={`text-[3vw] text-white transition-transform transform-gpu ease-linear duration-100 
                            ${isHoveredCat ? "opacity-0 text-white" : "opacity-100 text-white"}
                            ${isFontLarge ? "text-[4vw]" : "text-[3vw]"} ease-linear duration-100`} />
                        <BiSolidCategoryAlt
                            className={`text-[3vw] text-white mx-auto absolute top-0 transition-transform transform-gpu ease-linear duration-100 
                            ${isHoveredCat ? "opacity-100 text-white" : "opacity-0 text-white"}
                            ${isFontLarge ? "text-[4vw]" : "text-[3vw]"} ease-linear duration-100`} />
                        <Tooltip
                            id="categories"
                            type="dark"
                            effect="solid"
                            delayShow={50}
                            delayHide={50} />
                    </Link>
                </div>

                <h1 className={`text-white font-bold ${isFontLarge ? "text-[3vw]" : "text-[2.5vw]"} ease-linear duration-100 w-[50%] text-center`}>
                    Ogłoszeniowo
                </h1>

                <div className="w-[25%] flex flex-row mx-auto">
                    <div className="w-[100%] text-white grid grid-flow-col">
                        <div className="justify-evenly border-t-0 border-l-0 border-b-0 border-r-white border flex">
                            <Link
                                className={`nav-link text-white ${isFontLarge ? "text-2xl" : " text-base"}`}
                                data-tooltip-id="darkModeController"
                                data-tooltip-content="Zmień tryb strony">
                                {darkMode ?
                                    (
                                        <PiSunFill
                                            className={`mx-auto icon-hover text-[2.5vw] ease-linear duration-100 hover:text-yellow-500
                                            ${isFontLarge ? "text-[3vw]" : "text-[2.5vw]"}`}
                                            onClick={toogleTheme} />
                                    ) : (
                                        <IoMoon
                                            className={`mx-auto icon-hover text-[2.5vw] ease-linear duration-100 hover:text-yellow-200
                                            ${isFontLarge ? "text-[3vw]" : "text-[2.5vw]"}`}
                                            onClick={toogleTheme} />
                                    )}
                                <Tooltip
                                    id="darkModeController"
                                    type="dark"
                                    effect="solid"
                                    delayShow={50}
                                    delayHide={50} />
                            </Link>
                            <Link
                                onClick={toggleFont}
                                className={`nav-link text-white ${isFontLarge ? "text-2xl" : "text-base"}`}
                                data-tooltip-id="fontTooltip"
                                data-tooltip-content="Zmień wielkość czcionki">
                                <BiFontSize 
                                    className={`mx-auto icon-hover text-[2.5vw] ease-linear duration-100 hover:text-red-600
                                    ${isFontLarge ? "text-[3vw]" : "text-[2.5vw]"}`} />
                                <Tooltip
                                    id="fontTooltip"
                                    type="dark"
                                    effect="solid"
                                    delayShow={50}
                                    delayHide={50} />
                            </Link>
                        </div>
                        <Link
                            className={`nav-link text-white hover:text-green-400 ${isFontLarge ? "text-2xl" : "text-base"}`}
                            to="/logowanie"
                            data-tooltip-id="login"
                            data-tooltip-content="Zaloguj się">
                            <FiLogIn 
                                className={`mx-auto icon-hover text-[2.5vw] ease-linear duration-100
                                ${isFontLarge ? "text-[3vw]" : "text-[2.5vw]"}`} />
                            <Tooltip
                                id="login"
                                type="dark"
                                effect="solid"
                                delayShow={50}
                                delayHide={50}/>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
