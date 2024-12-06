import React, { useState, useEffect } from 'react';

const PredictionHistoryPage = () => {
  const [predictions, setPredictions] = useState([]);
  const userId = localStorage.getItem('userId'); // Stocké après la connexion

  useEffect(() => {
    // Charger l'historique des prédictions depuis l'API backend
    const fetchPredictionHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/history');
        const data = await response.json();
        setPredictions(data);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'historique des prédictions:', error);
      }
    };

    fetchPredictionHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Historique des Prédictions de Prix</h1>
      {predictions.length === 0 ? (
        <p className="text-center text-red-500 text-lg">Aucune prédiction disponible.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-2 text-left text-sm">Fabricant</th>
              <th className="px-4 py-2 text-left text-sm">Prix prédit</th>
              <th className="px-4 py-2 text-left text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction) => (
              <tr key={prediction.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-t text-sm text-gray-800">{prediction.manufacturer}</td>
                <td className="px-4 py-2 border-t text-sm text-gray-800">{prediction.predicted_price}</td>
                <td className="px-4 py-2 border-t text-sm text-gray-800">{prediction.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PredictionHistoryPage;