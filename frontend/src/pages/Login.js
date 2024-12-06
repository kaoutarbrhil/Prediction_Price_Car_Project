import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importez useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Pour gérer les erreurs
  const [successMessage, setSuccessMessage] = useState(""); // Pour gérer le succès
  const navigate = useNavigate(); // Initialise le hook de redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la connexion est réussie
        setSuccessMessage(data.message);
        setErrorMessage(""); // Réinitialiser les erreurs

        // Stocker l'ID utilisateur dans le localStorage
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userFullName", data.user.fullName);


        navigate("/prediction"); // Rediriger vers la page /Prediction
      } else {
        // Si une erreur se produit (email ou mot de passe invalide)
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
        <h2 className="text-2xl font-semibold text-center mb-6">Connexion</h2>
        <form onSubmit={handleSubmit}>
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
            Se connecter
          </button>
        </form>
        <p className="text-center mt-4">
          Vous n'avez pas de compte ?{" "}
          <a href="/signup" className="text-blue-600">Créez un compte</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
