import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext'; // Si vous avez un contexte global pour le thème
import { FaCog, FaLanguage, FaBell, FaSun, FaMoon } from 'react-icons/fa';
import '../css/Settings.css';

const Settings = () => {
  const { theme, setTheme } = useTheme(); // Utilisation du contexte pour la gestion du thème
  const [language, setLanguage] = useState('Français');
  const [notifications, setNotifications] = useState(true);

  // Effet pour appliquer le thème sélectionné
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  return (
    <div className="settings-container">
      <h2>Paramètres</h2>
      <div className="settings-item">
        <label>Thème :</label>
        <div className="theme-toggle">
          <button 
            onClick={() => handleThemeChange('light')} 
            className={theme === 'light' ? 'active' : ''}
          >
            <FaSun />
          </button>
          <button 
            onClick={() => handleThemeChange('dark')} 
            className={theme === 'dark' ? 'active' : ''}
          >
            <FaMoon />
          </button>
        </div>
      </div>

      <div className="settings-item">
        <label>Langue :</label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="Français">Français</option>
          <option value="Anglais">Anglais</option>
          <option value="Espagnol">Espagnol</option>
        </select>
      </div>

      <div className="settings-item">
        <label>Notifications :</label>
        <div className="notifications-toggle">
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
            id="notifications"
          />
          <label htmlFor="notifications">{notifications ? 'Activées' : 'Désactivées'}</label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
