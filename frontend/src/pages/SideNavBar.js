import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  FaChartLine,
  FaHistory,
  FaUserAlt,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from 'react-icons/fa';

export default function SideNavBar({setUserId }) {
  const { t } = useTranslation();
  const [isExpanded, setExpandState] = useState(true);

  const menuItems = [
    { text: t('menu.prediction'), icon: <FaChartLine />, path: "prediction" },
    { text: t('menu.history'), icon: <FaHistory />, path: "history" },
    { text: t('menu.account'), icon: <FaUserAlt />, path: "Compte" },
    { text: t('menu.settings'), icon: <FaCog />, path: "Paramètres" },
  ];
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Récupérer le nom de l'utilisateur depuis le localStorage
    const fullName = localStorage.getItem("userFullName");
    if (fullName) {
      setUserName(fullName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserId(null);  // Mettez à jour l'état userId
  };
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isExpanded ? "w-72" : "w-20"
        } bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 shadow-lg transition-all duration-300 border-r`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <button
            className="text-gray-500 dark:text-gray-400 focus:outline-none"
            onClick={() => setExpandState(!isExpanded)}
          >
            {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          {menuItems.map(({ text, icon, path }) => (
            <NavLink
              key={text}
              to={`/${path}`}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-lg transition-colors ${
                  isExpanded ? "px-6" : "justify-center"
                } ${
                  isActive
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              {isExpanded && <span>{text}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t dark:border-gray-700">
          {isExpanded && (
            <div className="flex items-center mb-4">
              <FaUserAlt className="text-2xl mr-3" />
              <div>
                <p className="font-semibold">{userName}</p>
              </div>
            </div>
          )}
          <Link
            to="/"
            onClick={handleLogout}
            className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg"
          >
            <FaSignOutAlt className="text-xl" />
            {isExpanded && <span>{t('menu.logout')}</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
