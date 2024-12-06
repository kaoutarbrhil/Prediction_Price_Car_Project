import React, { createContext, useState, useContext, useEffect } from 'react';

// Créez le contexte pour le thème
const ThemeContext = createContext();

// Fournisseur de contexte pour l'application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook pour accéder au contexte dans d'autres composants
export const useTheme = () => {
  return useContext(ThemeContext);
};
