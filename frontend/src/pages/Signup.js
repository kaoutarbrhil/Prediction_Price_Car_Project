import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importez useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State pour gérer les erreurs
  const [successMessage, setSuccessMessage] = useState(""); // State pour gérer le succès
  const navigate = useNavigate(); // Initialise le hook de redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.username,  // Envoi du nom d'utilisateur
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si l'inscription réussit
        setSuccessMessage(data.message);
        setErrorMessage(""); // Réinitialiser les erreurs
        setTimeout(() => {
          navigate("/login"); // Redirige l'utilisateur vers la page de connexion après un délai
        }, 2000);  // Attendre 2 secondes avant de rediriger
      } else {
        // Si une erreur se produit (par exemple, email déjà existant)
        setErrorMessage(data.error);
        setSuccessMessage(""); // Réinitialiser le message de succès
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard.");
      setSuccessMessage(""); // Réinitialiser le message de succès
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              id="username"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Affichage des messages de succès ou d'erreur */}
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm text-center">{successMessage}</p>
          )}

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md"
          >
            S'inscrire
          </button>
        </form>
        <p className="text-center mt-4">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="text-blue-600">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;