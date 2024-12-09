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

  const handleSave = () => {
    fetch(`http://127.0.0.1:5000/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedInfo),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to update user');
        return response.json();
      })
      .then(() => {
        setUserInfo({ ...editedInfo });
        setIsEditing(false);
      })
      .catch((error) => console.error('Error updating user:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
        <FaUser className="mr-2 text-blue-500" /> {t('menu.account')}
      </h2>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <label className="flex-shrink-0 text-lg font-semibold w-32 flex items-center">
            <FaUser className="mr-2 text-blue-500" /> {t('signup.username')}
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedInfo.name}
              onChange={handleInputChange}
              className="flex-grow px-3 py-2 border rounded-md text-gray-800"
            />
          ) : (
            <span className="text-lg text-gray-700 dark:text-gray-200">{userInfo.name}</span>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex-shrink-0 text-lg font-semibold w-32 flex items-center">
            <FaEnvelope className="mr-2 text-blue-500" /> {t('signup.email')}
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedInfo.email}
              onChange={handleInputChange}
              className="flex-grow px-3 py-2 border rounded-md text-gray-800"
            />
          ) : (
            <span className="text-lg text-gray-700 dark:text-gray-200">{userInfo.email}</span>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex-shrink-0 text-lg font-semibold w-32 flex items-center">
            <FaLock className="mr-2 text-blue-500" /> {t('signup.password')}
          </label>
          {isEditing ? (
            <div className="flex items-center gap-2 flex-grow">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={editedInfo.password || ''}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md text-gray-800 flex-grow"
              />
              <button
                type="button"
                className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? 'Cacher' : 'Afficher'}
              </button>
            </div>
          ) : (
            <span className="text-lg text-gray-700 dark:text-gray-200">********</span>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mx-2"
            >
              <FaSave className="mr-1 inline-block" /> {t('save')}
            </button>
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mx-2"
            >
              <FaTimes className="mr-1 inline-block" /> {t('cancel')}
            </button>
          </>
        ) : (
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            <FaEdit className="mr-1 inline-block" /> {t('update')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Compte;
