import React from 'react';
import { useTranslation } from 'react-i18next';


const Fonctionnalites = () => {
    const { t } = useTranslation();
    const features = [
        { icon: '🚗', description: t('features.predictionFree'), comingSoon: false },
        { icon: '🧠', description: t('features.aiAlgorithms'), comingSoon: false },
        { icon: '📂', description: t('features.historyAccess'), comingSoon: false },
        { icon: '🌍', description: t('features.intuitiveInterface'), comingSoon: false },
        { icon: '⚡', description: t('features.realTimeCalculation'), comingSoon: false },
        { icon: '⌚', description: t('features.access24_7'), comingSoon: false },
        { icon: '➕', description: t('features.comingSoon'), comingSoon: false },
      ];

  const planTarifaire = {
    name: t('planTarifaireName'),
    utilisateurIllimite: true,
    rapportPersonnalise: true,
    suggestionsAutomatiques: true,
    integrationAPIs: true,
    exportDonnees: true,
    supportTechnique: true,
    analyticsAvancees: true,
  };

  const avantages = [
    { label: t('advantages.accuratePrediction'), key: 'accuratePrediction' },
    { label: t('advantages.accessHistory'), key: 'accessHistory' },
    { label: t('advantages.simpleInterface'), key: 'simpleInterface' },
    { label: t('advantages.realData'), key: 'realData' },
    { label: t('advantages.freeApp'), key: 'freeApp' },
    { label: t('advantages.fastSignup'), key: 'fastSignup' },
    { label: t('advantages.instantResults'), key: 'instantResults' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Section des fonctionnalités */}
      <section id="features">
        <h2
          className="text-3xl font-extrabold text-gray-900 mb-6 dark:text-white"
          dangerouslySetInnerHTML={{ __html: t('advantagesTitle') }}
        ></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center bg-white dark:bg-gray-600  p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="text-blue-500 text-4xl mb-4">{feature.icon}</div>
              <p className="text-gray-800 text-center dark:text-white">{feature.description}</p>
              {feature.comingSoon && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  À venir
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section Pourquoi notre app */}
      <section id="advantages" className="mt-16">
        <h2
          className="text-3xl font-extrabold text-gray-900 mb-6 dark:text-white"
          dangerouslySetInnerHTML={{ __html: t("whyPredictCar") }}
        ></h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border dark:bg-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th className="py-3 px-4 border-b text-left font-medium"></th>
                <th className="py-3 px-4 border-b text-gray-900 font-medium text-center dark:text-white">
                  {planTarifaire.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {avantages.map((item, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="py-3 px-4 border-b font-medium dark:text-white">{item.label}</td>
                  <td className="py-3 px-4 border-b text-center">
                   ✔️
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Fonctionnalites;
