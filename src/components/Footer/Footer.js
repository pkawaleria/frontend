import '../../assets/styles/footer/footer.css';
import React from 'react';
import { BiHelpCircle } from 'react-icons/bi';
import { FcRules } from 'react-icons/fc';
import { Tooltip } from 'react-tooltip';

const Footer = () => {
    return (
        <footer className="bg-custom-blue">
            <div className="container mx-auto py-4">
                <div className="flex justify-center">
                    <ul className="flex space-x-6">
                        <li className="nav-item">
                            <a className="nav-link" href="/" data-tooltip-id='helpTooltip' data-tooltip-content="Pomoc">
                                <BiHelpCircle size={40} className="icon-hover text-white" />
                            </a>
                            <Tooltip id="helpTooltip" type="dark" effect="solid" />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/rules" data-tooltip-id='rulesTooltip' data-tooltip-content="Regulamin">
                                <FcRules size={40} className="icon-hover text-white" />
                            </a>
                            <Tooltip id="rulesTooltip" type="dark" effect="solid" />
                        </li>
                    </ul>
                </div>
                <div className="text-center text-white mt-4">
                    Copyright © 2023 - All rights reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;