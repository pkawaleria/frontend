import '../../assets/styles/footer/footer.css';
import React from 'react';
import { BiHelpCircle } from 'react-icons/bi';
import { FcRules, FcAbout } from 'react-icons/fc';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import { useFontSize } from '../fontSize/FontSizeContext';

export default function Footer() {
    const { isFontLarge } = useFontSize();

    return (
        <div className="flex flex-col py-4 sm:h-20 justify-center bg-blue-500/10 dark:bg-neutral-900/60">
            <div className="mx-auto mt-1">
                <ul className="flex space-x-6">
                    <Link to="/pomoc"
                        className={`${isFontLarge ? "text-2xl" : "text-base"}`}
                        data-tooltip-id='helpTooltip'
                        data-tooltip-content="Pomoc">
                        <li className="nav-item">
                            <BiHelpCircle className={`text-white hover:cursor-pointer ${isFontLarge ? "text-5xl" : "text-4xl"} `} />
                        </li>
                        <Tooltip id="helpTooltip" type="dark" effect="solid" />
                    </Link>
                    <Link to="/regulamin"
                        className={`${isFontLarge ? "text-2xl" : "text-base"}`}
                        data-tooltip-id='rulesTooltip'
                        data-tooltip-content="Regulamin">
                        <li className="nav-item">
                            <FcRules className={`hover:cursor-pointer ${isFontLarge ? "text-5xl" : "text-4xl"} `} />
                        </li>
                        <Tooltip id="rulesTooltip" type="dark" effect="solid" />
                    </Link>


                    <Link to="/o-stronie"
                        className={`${isFontLarge ? "text-2xl" : "text-base"}`}
                        data-tooltip-id='aboutTooltip'
                        data-tooltip-content="O nas">
                        <li className="nav-item">
                            <FcAbout className={`hover:cursor-pointer ${isFontLarge ? "text-5xl" : "text-4xl"} `} />
                        </li>
                        <Tooltip id="aboutTooltip" type="dark" effect="solid" />
                    </Link>
                </ul>
            </div>
            <div
                className={`text-center text-white mt-2
            ${isFontLarge ? "text-2xl" : "text-base"}`}>
                Copyright © 2023 - All rights reserved
            </div>
        </div >
    )
}
