import React, { useState } from 'react';
import { FaCog, FaLanguage, FaBell, FaSun, FaMoon } from 'react-icons/fa';
import '../css/Settings.css';
const Settings = () => {
  const [theme, setTheme] = useState('light'); // Default theme
  const [language, setLanguage] = useState('en'); // Default language
  const [notifications, setNotifications] = useState(true); // Notification toggle

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme); // Update theme globally
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">
        <FaCog className="settings-icon" /> Settings
      </h2>

      <div className="settings-section">
        <label htmlFor="theme-toggle" className="settings-label">
          <FaSun className="icon-light" /> / <FaMoon className="icon-dark" /> Theme:
        </label>
        <button onClick={handleThemeChange} className="theme-button">
          {theme === 'light' ? <FaSun /> : <FaMoon />} {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      </div>

      <div className="settings-section">
        <label htmlFor="language-select" className="settings-label">
          <FaLanguage className="settings-icon" /> Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          className="settings-select"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      <div className="settings-section">
        <label htmlFor="notifications-toggle" className="settings-label">
          <FaBell className="settings-icon" /> Notifications:
        </label>
        <button onClick={toggleNotifications} className="notifications-button">
          {notifications ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );
};

export default Settings;