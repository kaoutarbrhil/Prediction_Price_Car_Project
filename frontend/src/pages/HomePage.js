/*import React, { useState } from 'react';
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
          navigate('/Prediction'); // Redirect user to /predictions on successful login
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

export default HomePage;*/
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import image1 from '../img/Prix_dynamique.png';
import image2 from '../img/Maximisation_ventes.png';
import image3 from '../img/Marge_bénéficiaire.png';
import accueil from '../img/accueil.png';

function HomePage() {
  const { t } = useTranslation();
  const accueilRef = useRef(null);
  const avantagesRef = useRef(null);
  const contactRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className={`flex flex-col h-screen dark:bg-gray-900 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Navbar
        sections={[
          { ref: accueilRef, label: t('home') },
          { ref: avantagesRef, label: t('benefits') },
          { ref: contactRef, label: t('contact') },
        ]}
        onThemeToggle={handleThemeToggle} // Pass function to toggle theme
      />

      {/* Accueil Section */}
      <div ref={accueilRef} className="w-3/4 h-screen flex items-center justify-center mt-32 ml-60 mb-32 dark:bg-gray-900">
        <div className="w-1/2 pr-8 text-left">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-600 dark:text-white ">
            {t('discoverOptimalPrice')}
          </h1>
          <p className="text-lg sm:text-xl font-medium mt-8 dark:text-gray-50">
            {t('enterInfoAndPredict')}
          </p>
        </div>

        <div className="flex justify-center">
          <img src={accueil} alt="Démonstration" className="object-cover w-full" />
        </div>
      </div>

      {/* Section Avantages */}
      <div ref={avantagesRef} className="p-12 dark:text-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-4">{t('keyBenefits')}</h2>
        <div className="flex mb-10">
          <div className="w-1/2 pr-4 flex items-center">
            <div>
              <h3 className="text-2xl font-semibold">{t('optimalPriceDynamic')}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {t('priceOptimizationDescription')}
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img src={image1} alt="Prix dynamique" className="w-full h-96" />
          </div>
        </div>

        <div className="flex mb-10 bg-slate-50 dark:bg-gray-800">
          <div className="w-1/2">
            <img src={image2} alt="Maximisation des ventes" className="w-full h-96" />
          </div>
          <div className="w-1/2 pr-4 flex items-center">
            <div>
              <h3 className="text-2xl font-semibold">{t('maximizeSales')}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {t('salesMaximizationDescription')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex mb-10">
          <div className="w-1/2 pr-4 flex items-center justify-center">
            <div>
              <h3 className="text-2xl font-semibold">{t('improveMargins')}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {t('profitMarginsDescription')}
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img src={image3} alt="Marge bénéficiaire" className="w-full h-96" />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="p-4 bg-slate-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">{t('contact')}</h2>
        <form className="max-w-lg mx-auto bg-white dark:bg-gray-700 p-6 shadow rounded">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('name')}</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded dark:bg-gray-600 dark:text-gray-300"
              placeholder={t('namePlaceholder')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('email')}</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded dark:bg-gray-600 dark:text-gray-300"
              placeholder={t('emailPlaceholder')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('message')}</label>
            <textarea
              id="message"
              className="w-full p-2 border rounded dark:bg-gray-600 dark:text-gray-300"
              placeholder={t('messagePlaceholder')}
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-600"
          >
            {t('send')}
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
