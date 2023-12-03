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
        <div className="fixed bottom-5 right-5 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-blue-500 hover:bg-blue-700 dark:border-white dark:border dark:bg-neutral-600 dark:hover:bg-neutral-700/50 text-white py-2 px-4 rounded-full transition-all duration-300 z-[100]">
                    <FaArrowUp className="text-2xl" />
                </button>
            )}
        </div>
    );
}
