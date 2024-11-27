import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import '../css/Compte.css';

const Compte = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '********', // Password is masked
  });
  
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) setEditedInfo({ ...userInfo }); // Reset edits on cancel
  };

  const handleSave = () => {
    setUserInfo({ ...editedInfo });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="compte-container">
      <h2 className="compte-title">
        <FaUser className="compte-icon" /> Mon Compte
      </h2>

      <div className="compte-info">
        {/* Name Field */}
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

        {/* Email Field */}
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

        {/* Password Field */}
        <div className="compte-field">
          <label>
            <FaLock className="field-icon" /> Mot de passe :
          </label>
          {isEditing ? (
            <div className="password-input-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={editedInfo.password}
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
            <span>********</span> // Always masked
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