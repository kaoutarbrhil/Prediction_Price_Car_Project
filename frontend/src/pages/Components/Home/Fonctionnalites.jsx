import React from 'react';

const Fonctionnalites = () => {
    const features = [
        { icon: '🚗', description: "Prédiction gratuite des prix de voitures importées", comingSoon: false },
        { icon: '🧠', description: "Algorithmes avancés d'intelligence artificielle", comingSoon: false },
        { icon: '📂', description: "Historique des prédictions accessible en un clic", comingSoon: false },
        { icon: '🌍', description: "Une interface intuitive et accessible à tous", comingSoon: false },
        { icon: '⚡', description: "Calcul rapide et précis en temps réel", comingSoon: false },
        { icon: '⌚', description: "Accessible 24/7 depuis n'importe où", comingSoon: false },
        { icon: '➕', description: "Et bien plus à venir...", comingSoon: false },
      ];

  const planTarifaire = {
    name: 'App Prédiction de Prix',
    utilisateurIllimite: true,
    rapportPersonnalise: true,
    suggestionsAutomatiques: true,
    integrationAPIs: true,
    exportDonnees: true,
    supportTechnique: true,
    analyticsAvancees: true,
  };

  const avantages = [
    { label: 'Prédiction précise des prix de voiture', key: 'predictionPrix' },
    { label: 'Accès aux historiques de prédictions', key: 'historiquePredictions' },
    { label: 'Interface simple et facile à utiliser', key: 'interfaceSimple' },
    { label: 'Prédictions basées sur des données réelles', key: 'predictionsBaseesSurDonnees' },
    { label: 'Gratuit et sans abonnement', key: 'applicationGratuite' },
    { label: 'Création de compte rapide et sécurisée', key: 'creationCompteRapide' },
    { label: 'Prédictions instantanées avec des résultats fiables', key: 'resultatsInstantanes' },
];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Section des fonctionnalités */}
      <section id="features">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 dark:text-white">Ce que vous gagnez  avec <b className='text-purple-800'>PredictCar</b>  😍 ?</h2>
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
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 dark:text-white">
          Pourquoi <b className="text-purple-800">PredictCar</b> plutôt qu'une autre 😉 ?
        </h2>
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
