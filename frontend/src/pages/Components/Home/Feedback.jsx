import React, { useState } from 'react';

const FeedBack = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Gestion des changements dans les champs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion de la soumission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Envoi des données vers l'API
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convertir les données en JSON
      });

      if (response.ok) {
        setSuccessMessage('Votre message a été envoyé avec succès !');
        setErrorMessage('');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Réinitialiser le formulaire
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Une erreur est survenue.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Erreur lors de l\'envoi. Veuillez réessayer.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 py-12 px-4 sm:px-6 lg:px-8 transform transition-all duration-700 hover:scale-105 hover:bg-gradient-to-l">
      <h1 className="text-2xl font-bold text-white mb-4">
        Prenez contact avec notre équipe commerciale
      </h1>
      <h2 className="text-white text-lg text-center mb-6">
        Vous avez une question générale sur notre produit, nos plans ou autre chose ?
      </h2>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md dark:bg-gray-600"
      >
        {/* Champs de formulaire */}
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="subject"
          placeholder="Sujet"
          value={formData.subject}
          onChange={handleInputChange}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleInputChange}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        ></textarea>

        {/* Message de succès ou d'erreur */}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default FeedBack;

