

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Message de succès
        navigate("/login");
      } else {
        alert(data.error); // Affiche une erreur si l'email existe déjà
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Inscription</h2>
        <form onSubmit={handleSubmit}>
          {/* Nom d'utilisateur */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              id="username"
              pattern="^[A-Za-z\s]+$" // Validation : uniquement lettres et espaces
              title="Le nom d'utilisateur ne doit contenir que des lettres et des espaces." // Message d'erreur natif
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
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

          {/* Mot de passe */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Le mot de passe doit contenir au moins 8 caractères, incluant une lettre, un chiffre et un symbole."
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

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

