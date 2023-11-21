import "../../assets/styles/navbar/navbar.css";
import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.png";
import { BiUser, BiFontSize } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { useFontSize } from "../themes/FontSizeContext";
import { FiAlignLeft, FiAlignRight, FiLogIn } from "react-icons/fi";
import { BiSolidCategory, BiSolidCategoryAlt } from "react-icons/bi";

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

        <Link
          className="w-[7.5%] text-center relative"
          to="/"
          data-tooltip-id="advertisements"
          data-tooltip-content="Ogłoszenia"
          onMouseEnter={() => setHoveredAds(true)}
          onMouseLeave={() => setHoveredAds(false)}>
          <FiAlignLeft
            className={`text-[4vw] mx-auto transition-transform transform-gpu ${isHoveredAds ? 'opacity-0' : 'opacity-100'}`}
            style={{ color: "rgb(125, 125, 255)" }} />
          <FiAlignRight
            className={`text-[4vw] mx-auto absolute top-0 transition-transform transform-gpu ${isHoveredAds ? 'opacity-100' : 'opacity-0'}`}
            style={{ color: "rgb(125, 125, 255)" }} />
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
            className={`text-[4vw] transition-transform transform-gpu ${isHoveredCat ? 'opacity-0' : 'opacity-100'}`}
            style={{ color: "rgb(100, 80, 150)" }} />
          <BiSolidCategoryAlt
            className={`text-[4vw] mx-auto absolute top-0 transition-transform transform-gpu ${isHoveredCat ? 'opacity-100' : 'opacity-0'}`}
            style={{ color: "rgb(100, 80, 150)" }} />
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

        <div className="w-[25%] flex flex-row mx-auto">
          <div className="w-[50%]"></div>
          <div className="w-[40%] text-white hover:text-gray-400 grid grid-flow-col gap-3">
            <Link
              onClick={toggleFontSize}
              className="nav-link hover:text-gray-400 text-white"
              data-tooltip-id="fontTooltip"
              data-tooltip-content="Zmień wielkość czcionki">
              <BiFontSize className="mx-auto icon-hover text-[2.5vw] ease-linear duration-200" />
              <Tooltip
                id="fontTooltip"
                type="dark"
                effect="solid"
                delayShow={200}
                delayHide={100}
              />
            </Link>
            <Link
              className="nav-link text-white hover:text-gray-400"
              to="/logowanie"
              data-tooltip-id="login"
              data-tooltip-content="Zaloguj się">
              <FiLogIn className="mx-auto icon-hover text-[2.5vw] ease-linear duration-200" />
              <Tooltip
                id="login"
                type="dark"
                effect="solid"
                delayShow={200}
                delayHide={100}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
