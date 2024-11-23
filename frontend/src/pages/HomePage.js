import React, { useState } from 'react';
import '../css/HomePage.css';
import { FaGlobe } from 'react-icons/fa';
import logo from '../img/log22.png';

function HomePage() {
  const [activeSection, setActiveSection] = useState('home'); // 'home' or 'about' or 'form'
  const [activeForm, setActiveForm] = useState(''); // '' = no form displayed
  const [language, setLanguage] = useState('en'); // Default language is English
  const [showLanguageOptions, setShowLanguageOptions] = useState(false); // Controls language dropdown visibility

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowLanguageOptions(false); // Close dropdown after selecting
  };

  const text = {
    en: {
      home: 'Home',
      about: 'About Us',
      welcome: 'Welcome to Price Predictor',
      description: 'Track and predict prices for electronic products effortlessly.',
      aboutDescription:
        'Price Predictor helps you analyze historical data and predict future trends for electronic products.',
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email Address',
      password: 'Password',
      fullName: 'Full Name',
      confirmPassword: 'Confirm Password',
    },
    fr: {
      home: 'Accueil',
      about: 'À propos',
      welcome: 'Bienvenue sur Price Predictor',
      description: 'Suivez et prédisez les prix des produits électroniques facilement.',
      aboutDescription:
        'Price Predictor vous aide à analyser les données historiques et à prévoir les tendances futures des produits électroniques.',
      login: 'Connexion',
      signup: 'S\'inscrire',
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      fullName: 'Nom complet',
      confirmPassword: 'Confirmer le mot de passe',
    },
    ar: {
      home: 'الصفحة الرئيسية',
      about: 'من نحن',
      welcome: 'مرحبًا بك في Price Predictor',
      description: 'تتبع وتوقع أسعار المنتجات الإلكترونية بسهولة.',
      aboutDescription:
        'يساعدك Price Predictor في تحليل البيانات التاريخية والتنبؤ بالاتجاهات المستقبلية للمنتجات الإلكترونية.',
      login: 'تسجيل الدخول',
      signup: 'اشتراك',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      fullName: 'الاسم الكامل',
      confirmPassword: 'تأكيد كلمة المرور',
    },
  };
  
  

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="logo-container">
          <img src={logo} alt="App Logo" className="app-logo" />
          <h1>Price Predictor</h1>
        </div>
        <nav className="navigation-menu">
          
              <button onClick={() => setActiveSection('home')}>{text[language].home}</button>
           
              <button onClick={() => setActiveSection('about')}>{text[language].about}</button>
            
          
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
            {text[language].login}
          </button>
          <button
            className="header-button"
            onClick={() => {
              setActiveForm('signup');
              setActiveSection('form');
            }}
          >
            {text[language].signup}
          </button>
        </div>
      </header>

      {activeSection === 'home' && (
        <div className="homepage-content">
          <h2>{text[language].welcome}</h2>
          <p>{text[language].description}</p>
        </div>
      )}

      {activeSection === 'about' && (
        <div className="about-section">
          <h2>{text[language].about}</h2>
          <p>{text[language].aboutDescription}</p>
        </div>
      )}

      {activeSection === 'form' && activeForm === 'login' && (
        <div className="form-box">
          <h2>{text[language].login}</h2>
          <form>
            <input type="email" placeholder={text[language].email} required />
            <input type="password" placeholder={text[language].password} required />
            <button type="submit" className="form-button">{text[language].login}</button>
          </form>
        </div>
      )}

      {activeSection === 'form' && activeForm === 'signup' && (
        <div className="form-box">
          <h2>{text[language].signup}</h2>
          <form>
            <input type="text" placeholder={text[language].fullName} required />
            <input type="email" placeholder={text[language].email} required />
            <input type="password" placeholder={text[language].password} required />
            <input type="password" placeholder={text[language].confirmPassword} required />
            <button type="submit" className="form-button">{text[language].signup}</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePage;
