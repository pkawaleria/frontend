import "../../assets/styles/navbar/navbar.css";
import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/images/logo.png";
import { BiUser, BiFontSize } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { useFontSize } from "../themes/FontSizeContext";
import { FiAlignLeft, FiAlignRight } from "react-icons/fi";
import { BiSolidCategory, BiSolidCategoryAlt } from "react-icons/bi";

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

  const handleLogout = () => {
    // Dodaj kod obsługujący wylogowanie użytkownika
    // Możesz użyć funkcji do usuwania tokenu lub innego sposobu, który stosujesz w projekcie
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
          data-tooltip-content="Strona Głowna"
        >
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

        <Link
          className="w-[7.5%]text-center mx-auto relative"
          to="/"
          data-tooltip-id="advertisements"
          data-tooltip-content="Ogłoszenia"
          onMouseEnter={() => setHoveredAds(true)}
          onMouseLeave={() => setHoveredAds(false)}
        >
          <FiAlignLeft
            className={`text-[4vw] mx-auto transition-transform transform-gpu ${isHoveredAds ? "opacity-0" : "opacity-100"
              }`}
            style={{ color: "rgb(125, 125, 255)" }}
          />
          <FiAlignRight
            className={`text-[4vw] mx-auto absolute top-0 transition-transform transform-gpu ${isHoveredAds ? "opacity-100" : "opacity-0"
              }`}
            style={{ color: "rgb(125, 125, 255)" }}
          />
          <Tooltip
            id="advertisements"
            type="dark"
            effect="solid"
            delayShow={50}
            delayHide={50}
          />
        </Link>

        <Link
          className="w-[7.5%] text-center relative"
          to="/kategorie"
          data-tooltip-id="categories"
          data-tooltip-content="Kategorie"
          onMouseEnter={() => setHoveredCat(true)}
          onMouseLeave={() => setHoveredCat(false)}
        >
          <BiSolidCategory
            className={`text-[4vw] transition-transform transform-gpu ${isHoveredCat ? "opacity-0" : "opacity-100"
              }`}
            style={{ color: "rgb(100, 80, 150)" }}
          />
          <BiSolidCategoryAlt
            className={`text-[4vw] mx-auto absolute top-0 transition-transform transform-gpu ${isHoveredCat ? "opacity-100" : "opacity-0"
              }`}
            style={{ color: "rgb(100, 80, 150)" }}
          />
          <Tooltip
            id="categories"
            type="dark"
            effect="solid"
            delayShow={50}
            delayHide={50}
          />
        </Link>

        <h1 className="text-white font-bold text-[2.5vw] w-[50%] text-center">
          Ogłoszeniowo
        </h1>

        <div className="w-[25%] flex flex-row mx-auto" ref={dropdownRef}>
          <div className="w-[50%]"></div>
          <div className="w-[40%] text-white grid grid-flow-col gap-3">
            <Link
              onClick={toggleFontSize}
              className="nav-link text-white"
              data-tooltip-id="fontTooltip"
              data-tooltip-content="Zmień wielkość czcionki"
            >
              <BiFontSize
                className="mx-auto icon-hover text-[2.5vw] ease-linear duration-100 hover:text-blue-300"
              />
              <Tooltip
                id="fontTooltip"
                type="dark"
                effect="solid"
                delayShow={200}
                delayHide={100}
              />
            </Link>
            <div
              onClick={handleDropdownToggle}
              className="relative cursor-pointer"
            >
              <BiUser
                className={`mx-auto icon-hover text-[2.5vw] ease-linear duration-100 hover:text-blue-300 ${isDropdownOpen ? "text-blue-300" : ""
                  }`}
              />
              {isDropdownOpen && (
                <div className="absolute top-8 right-0 bg-white rounded-md shadow-md w-[15rem] text-gray-700">
                  <ul className="list-none p-2 cursor-default">
                    <li className="hover:bg-gray-300 px-3 py-2 ease-linear duration-100 cursor-pointer">
                      <Link
                        to="/profil"
                        className="font-bold text-[1.4vw]"
                      >
                        Twój profil ({userFirstName})
                      </Link>
                    </li>
                    <hr className="border-0 h-[1px] bg-gray-300" />
                    <li className="hover:bg-gray-300 px-3 py-2 ease-linear duration-100 cursor-pointer">
                      <Link
                        to="/nowe-ogloszenie"
                        className="text-[1.4vw]"
                      >
                        Dodaj ogłoszenie
                      </Link>
                    </li>
                    <hr className="border-0 h-[1px] bg-gray-300" />
                    <li className="hover:bg-gray-300 px-3 py-2 ease-linear duration-100 cursor-pointer">
                      <Link
                        to="/wyloguj"
                        className="text-[1.4vw]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Wyloguj się
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
