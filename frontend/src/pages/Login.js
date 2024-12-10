import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = ({ setUserId }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
      console.log(data); 

      if (response.ok) {
        setSuccessMessage(t("login.success_message"));
        setErrorMessage("");
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userFullName", data.user.fullName);
        setUserId(data.user.id);
        navigate("/prediction");
      } else {
        setErrorMessage(t("login.invalid_credentials"));
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error); 
      setErrorMessage(t("login.error_message"));
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
          {t("login.login")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              {t("login.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              {t("login.password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 dark:text-green-400 text-sm text-center">{successMessage}</p>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-700 dark:hover:bg-blue-800"
          >
            {t("login.submit")}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          {t("login.create_account")}{" "}
          <a href="/signup" className="text-blue-600 dark:text-blue-400">
            {t("login.create_account_link")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
