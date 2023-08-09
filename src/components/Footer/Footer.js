import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/style/footer/footer.css';

const Footer = () => {
    return (
        <footer>
            <div class="footer">
                <div class="row">
                    <ul>
                        <li><a href="/">Pomoc</a></li>
                        <li><a href="/">Regulamin</a></li>
                    </ul>
                </div>
                <div className="text-center text-white">
                    Copyright © 2023 - All rights reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;