import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    window.addEventListener("scroll", toggleVisibility);

    return (
        <div className="fixed bottom-5 right-5">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-all duration-300"
                >
                    <FaArrowUp className="text-2xl" />
                </button>
            )}
        </div>
    );
}
