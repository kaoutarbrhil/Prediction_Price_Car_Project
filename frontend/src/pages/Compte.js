// import React, { useState, useEffect } from 'react';
// import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
// import { useNavigate } from "react-router-dom";
// import '../css/Compte.css';

// const Compte = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userInfo, setUserInfo] = useState(null); // Initially null
//   const [editedInfo, setEditedInfo] = useState({});
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const navigate = useNavigate();


  
//   const userId = localStorage.getItem('userId'); // Stocké après la connexion


//   useEffect(() => {
//     if (!userId) {
//       navigate("/login"); // Rediriger si l'utilisateur n'est pas connecté
//     } else {
//       fetch(`http://127.0.0.1:5000/user/${userId}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setUserInfo(data);
//           setEditedInfo(data);
//         })
//         .catch((error) => console.error('Error fetching user:', error));
//     }
//   }, [userId, navigate]);  

//   useEffect(() => {
//     // Fetch user details on component load
//     fetch(`http://127.0.0.1:5000/user/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setUserInfo(data);
//         setEditedInfo(data);
//       })
//       .catch((error) => console.error('Error fetching user:', error));
//   }, [userId]);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     if (isEditing) setEditedInfo({ ...userInfo }); // Reset edits on cancel
//   };

//   const handleSave = () => {
//     // Update user details via API
//     fetch(`http://127.0.0.1:5000/user/${userId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(editedInfo),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to update user');
//         }
//         return response.json();
//       })
//       .then(() => {
//         setUserInfo({ ...editedInfo });
//         setIsEditing(false);
//       })
//       .catch((error) => console.error('Error updating user:', error));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedInfo({ ...editedInfo, [name]: value });
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   if (!userInfo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="compte-container">
//       <h2 className="compte-title">
//         <FaUser className="compte-icon" /> Mon Compte
//       </h2>

//       <div className="compte-info">
//         <div className="compte-field">
//           <label>
//             <FaUser className="field-icon" /> Nom :
//           </label>
//           {isEditing ? (
//             <input
//               type="text"
//               name="name"
//               value={editedInfo.name}
//               onChange={handleInputChange}
//               className="compte-input"
//             />
//           ) : (
//             <span>{userInfo.name}</span>
//           )}
//         </div>

//         <div className="compte-field">
//           <label>
//             <FaEnvelope className="field-icon" /> Email :
//           </label>
//           {isEditing ? (
//             <input
//               type="email"
//               name="email"
//               value={editedInfo.email}
//               onChange={handleInputChange}
//               className="compte-input"
//             />
//           ) : (
//             <span>{userInfo.email}</span>
//           )}
//         </div>

//         <div className="compte-field">
//           <label>
//             <FaLock className="field-icon" /> Mot de passe :
//           </label>
//           {isEditing ? (
//             <div className="password-input-container">
//               <input
//                 type={passwordVisible ? 'text' : 'password'}
//                 name="password"
//                 value={editedInfo.password || ''}
//                 onChange={handleInputChange}
//                 className="compte-input"
//               />
//               <button
//                 type="button"
//                 className="toggle-password-button"
//                 onClick={togglePasswordVisibility}
//               >
//                 {passwordVisible ? 'Cacher' : 'Afficher'}
//               </button>
//             </div>
//           ) : (
//             <span>********</span>
//           )}
//         </div>
//       </div>

//       <div className="compte-actions">
//         {isEditing ? (
//           <>
//             <button onClick={handleSave} className="action-button save-button">
//               <FaSave /> Enregistrer
//             </button>
//             <button onClick={handleEditToggle} className="action-button cancel-button">
//               <FaTimes /> Annuler
//             </button>
//           </>
//         ) : (
//           <button onClick={handleEditToggle} className="action-button edit-button">
//             <FaEdit /> Modifier
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Compte;
// import React, { useState, useEffect } from 'react';
// import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
// import { useNavigate } from "react-router-dom";
// import '../css/Compte.css';

// const Compte = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);
//   const [editedInfo, setEditedInfo] = useState({});
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
  
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     if (!userId) {
//       navigate("/login"); 
//     } else {
//       fetch(`http://127.0.0.1:5000/user/${userId}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setUserInfo(data);
//           setEditedInfo(data);
//         })
//         .catch((error) => console.error('Error fetching user:', error));
//     }
//   }, [userId, navigate]);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     if (isEditing) setEditedInfo({ ...userInfo }); 
//   };

//   const handleSave = () => {
//     if (validateForm()) {
//       fetch(`http://127.0.0.1:5000/user/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(editedInfo),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Failed to update user');
//           }
//           return response.json();
//         })
//         .then(() => {
//           setUserInfo({ ...editedInfo });
//           setIsEditing(false);
//         })
//         .catch((error) => console.error('Error updating user:', error));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!editedInfo.name) newErrors.name = "Le nom est requis.";
//     if (!editedInfo.email) newErrors.email = "L'email est requis.";
//     if (!editedInfo.password) newErrors.password = "Le mot de passe est requis.";
//     else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(editedInfo.password)) {
//       newErrors.password = "Le mot de passe doit contenir au moins 8 caractères, incluant une lettre, un chiffre et un symbole.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedInfo({ ...editedInfo, [name]: value });
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   if (!userInfo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="compte-container">
//       <h2 className="compte-title">
//         <FaUser className="compte-icon" /> Mon Compte
//       </h2>

//       <div className="compte-info">
//         <div className="compte-field">
//           <label>
//             <FaUser className="field-icon" /> Nom :
//           </label>
//           {isEditing ? (
//             <>
//               <input
//                 type="text"
//                 name="name"
//                 value={editedInfo.name}
//                 onChange={handleInputChange}
//                 className="compte-input"
//               />
//               {errors.name && <span className="error">{errors.name}</span>}
//             </>
//           ) : (
//             <span>{userInfo.name}</span>
//           )}
//         </div>

//         <div className="compte-field">
//           <label>
//             <FaEnvelope className="field-icon" /> Email :
//           </label>
//           {isEditing ? (
//             <>
//               <input
//                 type="email"
//                 name="email"
//                 value={editedInfo.email}
//                 onChange={handleInputChange}
//                 className="compte-input"
//               />
//               {errors.email && <span className="error">{errors.email}</span>}
//             </>
//           ) : (
//             <span>{userInfo.email}</span>
//           )}
//         </div>

//         <div className="compte-field">
//           <label>
//             <FaLock className="field-icon" /> Mot de passe :
//           </label>
//           {isEditing ? (
//             <>
//               <div className="password-input-container">
//                 <input
//                   type={passwordVisible ? 'text' : 'password'}
//                   name="password"
//                   value={editedInfo.password || ''}
//                   onChange={handleInputChange}
//                   className="compte-input"
//                 />
//                 <button
//                   type="button"
//                   className="toggle-password-button"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {passwordVisible ? 'Cacher' : 'Afficher'}
//                 </button>
//               </div>
//               {errors.password && <span className="error">{errors.password}</span>}
//             </>
//           ) : (
//             <span>********</span>
//           )}
//         </div>
//       </div>

//       <div className="compte-actions">
//         {isEditing ? (
//           <>
//             <button onClick={handleSave} className="action-button save-button">
//               <FaSave /> Enregistrer
//             </button>
//             <button onClick={handleEditToggle} className="action-button cancel-button">
//               <FaTimes /> Annuler
//             </button>
//           </>
//         ) : (
//           <button onClick={handleEditToggle} className="action-button edit-button">
//             <FaEdit /> Modifier
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Compte;

import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import '../css/Compte.css';

const Compte = () => {
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
      errorMessages.name = "Le nom doit contenir uniquement des lettres et des espaces.";
    }

    // Validate email (basic email format)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(editedInfo.email)) {
      valid = false;
      errorMessages.email = "L'email doit être valide.";
    }

    // Validate password (minimum 8 characters, 1 letter, 1 number, 1 symbol)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (editedInfo.password && !passwordRegex.test(editedInfo.password)) {
      valid = false;
      errorMessages.password = "Le mot de passe doit contenir au moins 8 caractères, une lettre, un chiffre et un symbole.";
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
            throw new Error('Failed to update user');
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
    <div className="compte-container">
      <h2 className="compte-title">
        <FaUser className="compte-icon" /> Mon Compte
      </h2>

      <form className="compte-info" onSubmit={handleSave}>
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
              id="username"
              pattern="^[A-Za-z\s]+$" // Validation : uniquement lettres et espaces
              title="Le nom d'utilisateur ne doit contenir que des lettres et des espaces." // Message d'erreur natif
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          ) : (
            <span>{userInfo.name}</span>
          )}
          {/* Error message for the name */}
          {errors.name && <small className="error-message">{errors.name}</small>}
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
              required
            />
          ) : (
            <span>{userInfo.email}</span>
          )}
          {errors.email && <small className="error-message">{errors.email}</small>}
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
                required
                minLength="8"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
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
          {errors.password && <small className="error-message">{errors.password}</small>}
        </div>

        <div className="compte-actions">
          {isEditing ? (
            <>
              <button type="submit" className="action-button save-button">
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
      </form>
    </div>
  );
};

export default Compte;
