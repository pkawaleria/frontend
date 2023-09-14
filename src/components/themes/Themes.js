import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // Domyślny rozmiar czcionki

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, fontSize, changeFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};
