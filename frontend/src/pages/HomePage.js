import React, { useState, useRef, useEffect } from 'react';
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

  // Sync dark mode with the document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar
        sections={[
          { ref: accueilRef, label: t('home') },
          { ref: avantagesRef, label: t('benefits') },
          { ref: contactRef, label: t('contact') },
        ]}
        onThemeToggle={handleThemeToggle} // Pass function to toggle theme
      />

      {/* Accueil Section */}
      <div ref={accueilRef} className="w-full h-screen flex items-center justify-center mt-32 mb-32">
        <div className="w-1/2 pr-8 text-left">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-600 dark:text-white">
            {t('discoverOptimalPrice')}
          </h1>
          <p className="text-lg sm:text-xl font-medium mt-8 dark:text-gray-50">
            {t('enterInfoAndPredict')}
          </p>
        </div>
        <div className="flex justify-center">
          <img src={accueil} alt="Démonstration" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Section Avantages */}
      <div ref={avantagesRef} className="p-12 dark:text-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-4">{t('keyBenefits')}</h2>
        <div className="flex mb-10">
          <div className="w-1/2 pr-4 flex items-center">
            <div>
              <h3 className="text-2xl font-semibold">{t('optimalPriceDynamic')}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{t('priceOptimizationDescription')}</p>
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
              <p className="mt-2 text-gray-600 dark:text-gray-300">{t('salesMaximizationDescription')}</p>
            </div>
          </div>
        </div>

        <div className="flex mb-10">
          <div className="w-1/2 pr-4 flex items-center justify-center">
            <div>
              <h3 className="text-2xl font-semibold">{t('improveMargins')}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{t('profitMarginsDescription')}</p>
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
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              {t('name')}
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded dark:bg-gray-600 dark:text-gray-300"
              placeholder={t('namePlaceholder')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded dark:bg-gray-600 dark:text-gray-300"
              placeholder={t('emailPlaceholder')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              {t('message')}
            </label>
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
