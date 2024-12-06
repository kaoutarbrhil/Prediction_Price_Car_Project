import React, { createContext, useState, useContext, useEffect } from 'react';

// Créer un contexte pour le thème
const ThemeContext = createContext();

// Fournisseur de contexte pour envelopper votre application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Valeur initiale du thème

  useEffect(() => {
    // Vérifie si un thème est déjà défini dans le localStorage et l'applique
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Sauvegarde le thème dans localStorage chaque fois qu'il change
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme); // Appliquer le thème sur le body
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personnalisé pour utiliser le thème dans n'importe quel composant
export const useTheme = () => {
  return useContext(ThemeContext);
};
