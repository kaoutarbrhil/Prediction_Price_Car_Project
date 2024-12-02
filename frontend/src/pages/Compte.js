import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import '../css/Compte.css';

const Compte = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Initially null
  const [editedInfo, setEditedInfo] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();


  //const userId = 1; // Replace with dynamic user ID (e.g., from authentication)
  // Remplacer userId par un id dynamique, récupéré depuis le localStorage ou un contexte global
  const userId = localStorage.getItem('userId'); // Stocké après la connexion


  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Rediriger si l'utilisateur n'est pas connecté
    } else {
      fetch(`http://127.0.0.1:5000/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
          setEditedInfo(data);
        })
        .catch((error) => console.error('Error fetching user:', error));
    }
  }, [userId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) setEditedInfo({ ...userInfo }); // Reset edits on cancel
  };

  const handleSave = () => {
    // Update user details via API
    fetch(`http://127.0.0.1:5000/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
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

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="compte-container">
      <h2 className="compte-title">
        <FaUser className="compte-icon" /> Mon Compte
      </h2>

      <div className="compte-info">
        <div className="compte-field">
          <label>
            <FaUser className="field-icon" /> Nom :
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedInfo.name}
              onChange={handleInputChange}
              className="compte-input"
            />
          ) : (
            <span>{userInfo.name}</span>
          )}
        </div>

        <div className="compte-field">
          <label>
            <FaEnvelope className="field-icon" /> Email :
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedInfo.email}
              onChange={handleInputChange}
              className="compte-input"
            />
          ) : (
            <span>{userInfo.email}</span>
          )}
        </div>

        <div className="compte-field">
          <label>
            <FaLock className="field-icon" /> Mot de passe :
          </label>
          {isEditing ? (
            <div className="password-input-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={editedInfo.password || ''}
                onChange={handleInputChange}
                className="compte-input"
              />
              <button
                type="button"
                className="toggle-password-button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? 'Cacher' : 'Afficher'}
              </button>
            </div>
          ) : (
            <span>********</span>
          )}
        </div>
      </div>

      <div className="compte-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="action-button save-button">
              <FaSave /> Enregistrer
            </button>
            <button onClick={handleEditToggle} className="action-button cancel-button">
              <FaTimes /> Annuler
            </button>
          </>
        ) : (
          <button onClick={handleEditToggle} className="action-button edit-button">
            <FaEdit /> Modifier
          </button>
        )}
      </div>
    </div>
  );
};

export default Compte;
