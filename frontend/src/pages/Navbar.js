import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../img/logo-removebg-preview.png';
import { FaGlobe, FaMoon, FaSun } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sections de la page
  const sections = [
    { label: t("accueil"), id: "acceuil" },
    { label: t("fonctionnalites"), id: "features" },
    { label: t("contact"), id: "Questions" },
  ];

  // Gestion du scroll
  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Gestion des langues
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setShowLanguageOptions(false);
  };

  // Gestion du mode sombre
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <nav className="h-16 bg-blue-600 dark:bg-gray-900 text-white dark:text-gray-200 flex items-center justify-between px-4 shadow fixed top-0 left-0 w-full z-10">
      {/* Logo et Titre */}
      <div className="flex items-center">
        <div style={{ width: '80px', height: '65px' }}>
            <img
              src={logo}
              alt="Car"
              //className="rounded-lg w-full h-full"
            />
        </div>
        <div className="text-lg font-bold">PredictCar</div>
      </div>

      {/* Liens de navigation */}
      <ul className="hidden md:flex space-x-4">
        {sections.map((section, index) => (
          <li key={index}>
            <button
              onClick={() => handleScrollTo(section.id)}
              className="hover:text-gray-300 dark:hover:text-gray-500 transition-colors duration-200"
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Actions supplémentaires */}
      
      <div className="flex items-center space-x-4">
        
        <div className="relative">
          <button onClick={() => setShowLanguageOptions(!showLanguageOptions)}>
            <FaGlobe className="text-xl" />
          </button>
          {showLanguageOptions && (
            <div className="absolute top-8 right-0 bg-white dark:bg-gray-800 text-blue-600 dark:text-white p-2 rounded shadow-lg">
              <button
                onClick={() => handleLanguageChange('en')}
                className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                En
              </button>
              <button
                onClick={() => handleLanguageChange('fr')}
                className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Fr
              </button>
              <button
                onClick={() => handleLanguageChange('hi')}
                className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Hi
              </button>
            </div>
          )}
        </div>
        

        {/* Basculer le mode sombre */}
        
        <button
          onClick={handleThemeToggle}
          className={`p-2 rounded transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 text-yellow-500 hover:bg-gray-700' : 'bg-white text-blue-600 hover:bg-gray-100'
          }`}
        >
          {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>
        

        {/* Bouton de connexion */}
        <button
          onClick={() => navigate("/login")}
          className={`px-4 py-2 rounded transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-blue-600 hover:bg-gray-100'
          }`}
        >
          {t('connect')}
        </button>
      </div>
    </nav>
  );
}