import React, { useState } from 'react';
import { FaCog, FaLanguage, FaBell, FaSun, FaMoon } from 'react-icons/fa';

const Settings = () => {
  const [theme, setTheme] = useState('light'); // Default theme
  const [language, setLanguage] = useState('en'); // Default language

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Tailwind dark mode
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
        <FaCog className="mr-2" /> Settings
      </h2>

      <div className="mb-6">
        <label htmlFor="theme-toggle" className=" text-lg font-medium mb-2 flex items-center">
          <FaSun className="mr-1 text-yellow-500" /> / <FaMoon className="mr-2 text-blue-500" /> Theme:
        </label>
        <button
          onClick={handleThemeChange}
          className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          {theme === 'light' ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="language-select" className=" text-lg font-medium mb-2 flex items-center">
          <FaLanguage className="mr-2" /> Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
