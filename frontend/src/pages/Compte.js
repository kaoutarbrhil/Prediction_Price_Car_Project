import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Compte = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [editedInfo, setEditedInfo] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Récupération des informations de l'utilisateur
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      fetch(`http://127.0.0.1:5000/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
          setEditedInfo(data);
        })
        .catch((error) => console.error('Error fetching user:', error));
    }
  }, [userId, navigate]);

  // Validation du formulaire
  const validateForm = () => {
    let valid = true;
    const errorMessages = {};

    if (!/^[A-Za-z\s]+$/.test(editedInfo.name)) {
      valid = false;
      errorMessages.name = t("error.invalidName");
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(editedInfo.email)) {
      valid = false;
      errorMessages.email = t("error.invalidEmail");
    }

    if (editedInfo.password && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(editedInfo.password)) {
      valid = false;
      errorMessages.password = t("error.invalidPassword");
    }

    setErrors(errorMessages);
    return valid;
  };

  // Gestion de l'enregistrement des modifications
  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`http://127.0.0.1:5000/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedInfo),
      })
        .then((response) => {
          if (!response.ok) throw new Error(t("error.updateFailed"));
          return response.json();
        })
        .then(() => {
          setUserInfo({ ...editedInfo });
          setIsEditing(false);
        })
        .catch((error) => console.error(error.message));
    }
  };

  // Gestion des champs d'entrée
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Affichage ou masquage du mot de passe
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  if (!userInfo) return <div>{t("loading")}</div>;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
        <FaUser className="mr-2 text-blue-500" /> {t('menu.account')}
      </h2>

      <form className="space-y-6" onSubmit={handleSave}>
        {/* Nom */}
        <div className="flex items-center space-x-4">
          <label htmlFor="name" className="flex-shrink-0 text-lg font-semibold w-32">
            <FaUser className="mr-2 text-blue-500" /> {t('signup.username')}
          </label>
          {isEditing ? (
            <input
              id="name"
              name="name"
              type="text"
              value={editedInfo.name || ""}
              onChange={handleInputChange}
              className="flex-grow px-3 py-2 border rounded-md"
              required
            />
          ) : (
            <span>{userInfo.name}</span>
          )}
          {errors.name && <small className="text-red-500">{errors.name}</small>}
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <label htmlFor="email" className="flex-shrink-0 text-lg font-semibold w-32">
            <FaEnvelope className="mr-2 text-blue-500" /> {t('signup.email')}
          </label>
          {isEditing ? (
            <input
              id="email"
              name="email"
              type="email"
              value={editedInfo.email || ""}
              onChange={handleInputChange}
              className="flex-grow px-3 py-2 border rounded-md"
              required
            />
          ) : (
            <span>{userInfo.email}</span>
          )}
          {errors.email && <small className="text-red-500">{errors.email}</small>}
        </div>

        {/* Mot de passe */}
        <div className="flex items-center space-x-4">
          <label htmlFor="password" className="flex-shrink-0 text-lg font-semibold w-32">
            <FaLock className="mr-2 text-blue-500" /> {t('signup.password')}
          </label>
          {isEditing ? (
            <div className="flex-grow flex items-center space-x-2">
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                value={editedInfo.password || ""}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md flex-grow"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-blue-500"
              >
                {passwordVisible ? t("hide") : t("show")}
              </button>
            </div>
          ) : (
            <span>********</span>
          )}
          {errors.password && <small className="text-red-500">{errors.password}</small>}
        </div>

        {/* Actions */}
        <div className="text-center">
          {isEditing ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2"
              >
                <FaSave /> {t('save')}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md mx-2"
              >
                <FaTimes /> {t('cancel')}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              <FaEdit /> {t('update')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Compte;

