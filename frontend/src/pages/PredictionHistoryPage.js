import React, { useEffect, useState } from 'react';

const PredictionHistory = () => {
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPredictionHistory = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Récupérer l'ID utilisateur depuis le stockage local (assurez-vous qu'il est stocké lors de la connexion)
                
                if (!userId) {
                    setError("Utilisateur non connecté");
                    return;
                }

                const response = await fetch('http://localhost:5000/history', {
                    method: 'GET',
                    headers: {
                        'Authorization': userId // Inclure l'ID utilisateur dans les en-têtes
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération de l’historique');
                }

                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setPredictions(data);
                } else {
                    setError("Aucune prédiction trouvée pour cet utilisateur");
                }

            } catch (err) {
                setError(err.message);
            }
        };

        fetchPredictionHistory();
    }, []);

    return (
      <div className="bg-blue-50 min-h-screen p-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Historique des Prédictions</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-blue-100 text-blue-700">
                      <tr>
                          <th className="py-3 px-4 border-b text-left">ID</th>
                          <th className="py-3 px-4 border-b text-left">Fabricant</th>
                          <th className="py-3 px-4 border-b text-left">Type de carburant</th>
                          <th className="py-3 px-4 border-b text-left">Transmission</th>
                          <th className="py-3 px-4 border-b text-left">Année du modèle</th>
                          <th className="py-3 px-4 border-b text-left">Kilométrage</th>
                          <th className="py-3 px-4 border-b text-left">Nombre de propriétaires</th>
                          <th className="py-3 px-4 border-b text-left">Prix prédit</th>
                          <th className="py-3 px-4 border-b text-left">Date</th>
                      </tr>
                  </thead>
                  <tbody>
                      {predictions.map((prediction) => (
                          <tr key={prediction.id} className="hover:bg-blue-50">
                              <td className="py-3 px-4 border-b">{prediction.id}</td>
                              <td className="py-3 px-4 border-b">{prediction.manufacturer}</td>
                              <td className="py-3 px-4 border-b">{prediction.fuel_type}</td>
                              <td className="py-3 px-4 border-b">{prediction.transmission}</td>
                              <td className="py-3 px-4 border-b">{prediction.model_year}</td>
                              <td className="py-3 px-4 border-b">{prediction.kms_driven}</td>
                              <td className="py-3 px-4 border-b">{prediction.num_owners}</td>
                              <td className="py-3 px-4 border-b">{prediction.predicted_price}</td>
                              <td className="py-3 px-4 border-b">{new Date(prediction.timestamp).toLocaleString()}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    );
};

export default PredictionHistory;

