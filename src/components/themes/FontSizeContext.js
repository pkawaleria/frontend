// FontSizeContext.js

import React, { createContext, useContext, useState } from 'react';

const FontSizeContext = createContext();

export function FontSizeProvider({ children }) {
  const [fontSize, setFontSize] = useState('small'); // Domyślny rozmiar czcionki

  const toggleFontSize = () => {
    setFontSize((prevSize) => (prevSize === 'small' ? 'medium' : 'small'));
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, toggleFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  return useContext(FontSizeContext);
}
