import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import '../css/Compte.css';
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) setEditedInfo({ ...userInfo }); 
  };

  const validateForm = () => {
    let valid = true;
    let errorMessages = {};

    // Validate name (only letters and spaces)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(editedInfo.name)) {
      valid = false;
      errorMessages.name =  t("error.invalidName");
    }

    // Validate email (basic email format)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(editedInfo.email)) {
      valid = false;
      errorMessages.email = t("error.invalidEmail");
    }

    // Validate password (minimum 8 characters, 1 letter, 1 number, 1 symbol)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (editedInfo.password && !passwordRegex.test(editedInfo.password)) {
      valid = false;
      errorMessages.password = t("error.invalidPassword");
    }

    setErrors(errorMessages);
    return valid;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`http://127.0.0.1:5000/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedInfo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(t("error.updateFailed"));
          }
          return response.json();
        })
        .then(() => {
          setUserInfo({ ...editedInfo });
          setIsEditing(false);
        })
        .catch((error) => console.error('Error updating user:', error));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        <FaUser className="inline mr-2" /> {t('menu.account')}
      </h2>

      <form onSubmit={handleSave}>
        <div className="mb-4 flex items-center gap-2">
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            <FaUser className="mr-2" />{t('signup.username')}
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedInfo.name}
              onChange={handleInputChange}
              id="username"
              pattern="^[A-Za-z\s]+$" // Validation : uniquement lettres et espaces
              title="Le nom d'utilisateur ne doit contenir que des lettres et des espaces." // Message d'erreur natif
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          ) : (
            <span className="text-gray-600 dark:text-gray-400">{userInfo.name}</span>
          )}
          {/* Error message for the name */}
          {errors.name && <small className="error-message">{errors.name}</small>}
        </div>

        <div className="mb-4 flex items-center gap-2">
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            <FaEnvelope className="mr-2" /> {t('signup.email')}
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedInfo.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          ) : (
            <span className='dark:text-gray-400'>{userInfo.email}</span>
          )}
          {errors.email && <small className="error-message">{errors.email}</small>}
        </div>

        <div className="mb-4 flex items-center gap-2">
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            <FaLock className="mr-2" />  {t('signup.password')}
          </label>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={editedInfo.password || ''}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                minLength="8"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              />
              <button
                type="button"
                className="p-2 bg-orange-500 text-white rounded-md dark:bg-orange-600 hover:bg-orange-400 dark:hover:bg-orange-500"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? 'Cacher' : 'Afficher'}
              </button>
            </div>
          ) : (
            <span className="text-gray-600 dark:text-gray-400">********</span>
          )}
          {errors.password && <small className="error-message">{errors.password}</small>}
        </div>

        <div className="text-center">
          {isEditing ? (
            <>
              <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md dark:bg-blue-600 hover:bg-blue-400 dark:hover:bg-blue-500">
                <FaSave /> {t('save')}
              </button>
              <button onClick={handleEditToggle} className="px-6 py-2 bg-red-500 text-white rounded-md dark:bg-red-600 hover:bg-red-400 dark:hover:bg-red-500 ml-2">
                <FaTimes /> {t('cancel')}
              </button>
            </>
          ) : (
            <button onClick={handleEditToggle} className="px-6 py-2 bg-green-500 text-white rounded-md dark:bg-green-600 hover:bg-green-400 dark:hover:bg-green-500">
              <FaEdit /> {t('update')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Compte;
