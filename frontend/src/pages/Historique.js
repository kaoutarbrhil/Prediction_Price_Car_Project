import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/historique.css';

export default function HistoriquePage() {
    const [historique, setHistorique] = useState([]);

    useEffect(() => {
        // Appeler l'API Flask pour récupérer l'historique des prédictions
        axios.get("http://127.0.0.1:5000/get_history")
            .then(response => {
                setHistorique(response.data);
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de la récupération de l'historique :", error);
            });
    }, []);

    return (
        <div className="historique-page">
            <h1 className="title">Historique des Prédictions</h1>
            <div className="historique-table">
                <table>
                    <thead>
                        <tr>
                            <th>Ville</th>
                            <th>Fabricant</th>
                            <th>Carburant</th>
                            <th>Prix Prédit</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historique.map((entry) => (
                            <tr key={entry.timestamp}>
                                <td>{entry.city}</td>
                                <td>{entry.manufacturer}</td>
                                <td>{entry.fuel_type}</td>
                                <td>{entry.predicted_price.toFixed(2)} €</td>
                                <td>{new Date(entry.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
