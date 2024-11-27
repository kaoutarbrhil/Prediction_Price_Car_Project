import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import i18next hook
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import '../css/HomePage.css';
import { FaGlobe } from 'react-icons/fa';
import logo from '../img/log22.png';

function HomePage() {
  const { t, i18n } = useTranslation(); // Hook for translation and language change
  const navigate = useNavigate(); // React Router hook for navigation
  const [activeSection, setActiveSection] = useState('home'); // 'home', 'about', or 'form'
  const [activeForm, setActiveForm] = useState(''); // '' = no form displayed
  const [showLanguageOptions, setShowLanguageOptions] = useState(false); // Controls language dropdown visibility

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Change the language using i18next
    setShowLanguageOptions(false); // Close dropdown after selecting
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = activeForm === 'signup' ? '/signup' : '/login';
    const payload =
      activeForm === 'signup'
        ? { fullName: formData.fullName, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5000${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        if (activeForm === 'login') {
          alert(t('loginSuccess'));
          navigate('/prediction'); // Redirect user to /predictions on successful login
        } else {
          alert(t('signupSuccess'));
        }
      } else {
        alert(data.error || t('errorOccurred'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('errorOccurred'));
    }
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="logo-container">
          <img src={logo} alt="App Logo" className="app-logo" />
          <h1>{t('appName')}</h1>
        </div>
        <nav className="navigation-menu">
          <button onClick={() => setActiveSection('home')}>{t('home')}</button>
          <button onClick={() => setActiveSection('about')}>{t('about')}</button>
        </nav>
        <div className="header-actions">
          <div className="language-selector">
            <FaGlobe
              className="language-icon"
              onClick={() => setShowLanguageOptions(!showLanguageOptions)}
            />
            {showLanguageOptions && (
              <div className="language-dropdown">
                <button onClick={() => handleLanguageChange('en')}>English</button>
                <button onClick={() => handleLanguageChange('fr')}>Français</button>
                <button onClick={() => handleLanguageChange('ar')}>العربية</button>
              </div>
            )}
          </div>
          <button
            className="header-button"
            onClick={() => {
              setActiveForm('login');
              setActiveSection('form');
            }}
          >
            {t('login')}
          </button>
          <button
            className="header-button"
            onClick={() => {
              setActiveForm('signup');
              setActiveSection('form');
            }}
          >
            {t('signup')}
          </button>
        </div>
      </header>

      {activeSection === 'home' && (
        <div className="homepage-content">
          <h2>{t('welcome')}</h2>
          <p>{t('description')}</p>
        </div>
      )}

      {activeSection === 'about' && (
        <div className="about-section">
          <h2>{t('about')}</h2>
          <p>{t('aboutDescription')}</p>
        </div>
      )}

      {activeSection === 'form' && activeForm && (
        <div className="form-box">
          <h2>{t(activeForm)}</h2>
          <form onSubmit={handleFormSubmit}>
            {activeForm === 'signup' && (
              <input
                type="text"
                name="fullName"
                placeholder={t('fullName')}
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder={t('email')}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder={t('password')}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {activeForm === 'signup' && (
              <input
                type="password"
                name="confirmPassword"
                placeholder={t('confirmPassword')}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            )}
            <button type="submit" className="form-button">
              {t(activeForm)}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePage;