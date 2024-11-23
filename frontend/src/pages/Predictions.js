import React from 'react';
import './Predictions.css';

const predictions = [
  { id: 1, name: 'Laptop HP', predictedPrice: '$1100', period: '3 mois' },
  { id: 2, name: 'AirPods Pro', predictedPrice: '$220', period: '1 mois' },
  { id: 3, name: 'Samsung Galaxy', predictedPrice: '$880', period: '6 mois' },
];

const Predictions = () => (
  <div className="predictions-container">
    <h2>Prédictions des Prix</h2>
    <table className="predictions-table">
      <thead>
        <tr>
          <th>Produit</th>
          <th>Prix Prévu</th>
          <th>Période</th>
        </tr>
      </thead>
      <tbody>
        {predictions.map((pred) => (
          <tr key={pred.id}>
            <td>{pred.name}</td>
            <td>{pred.predictedPrice}</td>
            <td>{pred.period}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Predictions;
