import '../../assets/styles/footer/footer.css';
import React from 'react';
import { BiHelpCircle } from 'react-icons/bi';
import { FcRules, FcAbout } from 'react-icons/fc';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className="flex flex-col py-4 h-[10%] justify-center bg-blue-500/10 dark:bg-neutral-900/60">
            <div className="justify-center mx-auto mt-1">
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/pomoc" data-tooltip-id='helpTooltip' data-tooltip-content="Pomoc">
                            <BiHelpCircle size={40} className="text-white hover:cursor-pointer" />
                        </Link>
                        <Tooltip id="helpTooltip" type="dark" effect="solid" />
                    </li>
                    <li className="nav-item">
                        <Link to="/regulamin" data-tooltip-id='rulesTooltip' data-tooltip-content="Regulamin">
                            <FcRules size={40} className="hover:cursor-pointer" />
                        </Link>
                        <Tooltip id="rulesTooltip" type="dark" effect="solid" />
                    </li>
                    <li className="nav-item">
                        <Link to="/o-stronie" data-tooltip-id='aboutTooltip' data-tooltip-content="O stronie">
                            <FcAbout size={40} className="hover:cursor-pointer" />
                        </Link>
                        <Tooltip id="aboutTooltip" type="dark" effect="solid" />
                    </li>
                </ul>
            </div>
            <div className="text-center text-white mt-2">
                Copyright © 2023 - All rights reserved
            </div>
        </div>
    )
}