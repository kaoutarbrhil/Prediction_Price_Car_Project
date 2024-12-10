import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t, i18n } = useTranslation(); // Hook pour les traductions
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState("en"); // Langue par défaut
  const navigate = useNavigate();

  // Récupérer la langue et le mode sombre depuis localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setLang(savedLang); // Met à jour le state de la langue
    }

    if (savedMode === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, [i18n]);

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
      console.log(data); 

      if (response.ok) {
        setSuccessMessage(t("signup.success_message"));
        setErrorMessage("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrorMessage(t("signup.email_exists")); // Erreur traduite
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(t("signup.error_message")); // Message d'erreur traduit
      setSuccessMessage("");
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-center  dark:bg-gray-900 bg-gray-100`}>
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          {t("signup.signup")} {/* Titre traduit */}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Nom d'utilisateur */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 dark:text-white"
            >
              {t("signup.username")} {/* Label nom d'utilisateur traduit */}
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              id="username"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              pattern="^[A-Za-z\s]+$" // Validation : uniquement lettres et espaces
              title="Le nom d'utilisateur ne doit contenir que des lettres et des espaces." // Message d'erreur natif
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 dark:text-white"
            >
              {t("signup.email")} {/* Label email traduit */}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-white"
            >
              {t("signup.password")} {/* Label mot de passe traduit */}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Le mot de passe doit contenir au moins 8 caractères, incluant une lettre, un chiffre et un symbole."              
              className="w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Messages de succès ou d'erreur traduits */}
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm text-center">{successMessage}</p>
          )}

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md dark:bg-blue-800"
          >
            {t("signup.submit")} {/* Texte du bouton traduit */}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-white">
          {t("signup.existing_account")}{" "}
          <a href="/login" className="text-blue-600 dark:text-blue-400">
            {t("signup.login_link")} {/* Lien traduit */}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

