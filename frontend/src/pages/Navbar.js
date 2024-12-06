import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../img/log22.png';
import { FaGlobe, FaMoon, FaSun } from 'react-icons/fa'; // For language and theme icons
import { useTranslation } from 'react-i18next'; // Assuming i18next is used for translations

export default function Navbar({ sections }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation(); // Hook for translation and language change
  const [showLanguageOptions, setShowLanguageOptions] = useState(false); // Controls language dropdown visibility
  const [isDarkMode, setIsDarkMode] = useState(false); // Controls dark mode toggle
  
  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle language change
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setShowLanguageOptions(false); // Close the language dropdown after selection
  };

  // Handle dark mode toggle
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode); // Toggle dark class on the root element
  };

  return (
    <nav className="h-16 bg-blue-600 dark:bg-gray-900 text-white dark:text-gray-200 flex items-center justify-between px-4 shadow fixed top-0 left-0 w-full z-10">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-12 h-12 mr-4" />
        <div className="text-lg font-bold">PredictApp</div>
      </div>
      <ul className="flex space-x-4">
        {sections.map((section, index) => (
          <li key={index}>
            <button
              onClick={() => handleScroll(section.ref)}
              className="hover:text-gray-300 dark:hover:text-gray-500"
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-4">
        {/* Language selector */}
        <button
          onClick={() => setShowLanguageOptions(!showLanguageOptions)}
          className="relative"
        >
          <FaGlobe className="text-xl" />
          {showLanguageOptions && (
            <div className="absolute top-8 right-0 bg-white dark:bg-gray-800 text-blue-600 dark:text-white p-2 rounded shadow-lg">
              <button
                onClick={() => handleLanguageChange('en')}
                className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('fr')}
                className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Français
              </button>
            </div>
          )}
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={handleThemeToggle}
          className={`p-2 rounded ${isDarkMode ? 'bg-gray-800 text-yellow-500 hover:bg-gray-700' : 'bg-white text-blue-600 hover:bg-gray-100'}`}
        >
          {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>

        {/* Login button */}
        <button
          onClick={() => navigate("/login")}
          className={`px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-blue-600'}`}
        >
          Se connecter
        </button>
      </div>
    </nav>
  );
}
