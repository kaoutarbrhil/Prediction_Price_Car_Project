import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stocker les informations utilisateur
  const [isLoading, setIsLoading] = useState(true); // Suivre l'état de chargement
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Fonction pour connecter un utilisateur
  const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/accueil");
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion : " + error.message);
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ user, isLoading, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
