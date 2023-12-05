import React, { createContext, useContext, useState } from 'react';

const FontSizeContext = createContext();

export function FontSizeProvider({ children }) {
    const [isFontLarge, setIsFontLarge] = useState(false);

    const toggleFont = () => {
        setIsFontLarge((prevValue) => !prevValue);
    };

    return (
        <FontSizeContext.Provider value={{ isFontLarge, toggleFont }}>
            {children}
        </FontSizeContext.Provider>
    );
}

export const useFontSize = () => {
    return useContext(FontSizeContext);
}
