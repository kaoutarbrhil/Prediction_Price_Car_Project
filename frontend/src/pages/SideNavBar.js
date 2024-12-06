// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import '../css/SideNavBar.css';
// import { FaHome, FaChartLine, FaBox, FaCog } from 'react-icons/fa';

// const SideNavBar = () => {
//   return (
//     <div className="sidenavbar-container">
//       <div className="sidenavbar-logo">
//         <h2>PricePredict</h2>
//       </div>
//       <div className="sidenavbar-menu">
//         <NavLink
//           to="/dashboard"
//           className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
//         >
//           <FaHome className="menu-icon" />
//           Dashboard
//         </NavLink>
//         <NavLink
//           to="/predictions"
//           className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
//         >
//           <FaChartLine className="menu-icon" />
//           Prédictions
//         </NavLink>
//         <NavLink
//           to="/products"
//           className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
//         >
//           <FaBox className="menu-icon" />
//           Produits
//         </NavLink>
//         <NavLink
//           to="/settings"
//           className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
//         >
//           <FaCog className="menu-icon" />
//           Paramètres
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default SideNavBar;

/*import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import '../css/SideNavBar.css';
import { FaChartLine, FaHistory, FaUserAlt, FaCog, FaBars, FaSignOutAlt } from 'react-icons/fa';

export default function SideNavBar() {
    const [isExpanded, setExpandState] = useState(false);

    const menuItems = [
        { text: 'Prédiction', icon: <FaChartLine className="menu-icon" />, path: "prediction" },
        { text: 'Historique', icon: <FaHistory className="menu-icon" />, path: "historique" },
        { text: 'Compte', icon: <FaUserAlt className="menu-icon" />, path: "Compte" },
        { text: 'Paramètres', icon: <FaCog className="menu-icon" />, path: "Paramètres" }
    ];

    return (
        <div className="layout">
            <div className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
                <div className="nav-upper">
                    <div className="nav-heading">
                        <button
                            className={isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"}
                            onClick={() => setExpandState(!isExpanded)}
                        >
                            <FaBars />
                        </button>
                    </div>
                    <div className="nav-menu">
                        {menuItems.map(({ text, icon, path }) => (
                            <Link
                                key={text}
                                to={`/${path}`}
                                className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
                            >
                                <div className="menu-item-icon">{icon}</div>
                                {isExpanded && <p>{text}</p>}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="nav-footer">
                    {isExpanded && (
                        <div className="nav-details">
                            <div className="nav-footer-avatar"><FaUserAlt /></div>
                            <div className="nav-footer-info">
                                <p className="nav-footer-user-name">Sana Barkouch</p>
                                <p className="nav-footer-user-position">{'logout'}</p>
                            </div>
                        </div>
                    )}
                    <Link to="/">
                        <FaSignOutAlt className="logout-icon" />
                    </Link>
                </div>
            </div>
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}*/

import React, {useEffect, useState } from 'react';
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FaChartLine,
  FaHistory,
  FaUserAlt,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from 'react-icons/fa';

export default function SideNavBar() {
  const [isExpanded, setExpandState] = useState(true);

  const menuItems = [
    { text: 'Prédiction', icon: <FaChartLine />, path: "prediction" },
    { text: 'Historique', icon: <FaHistory />, path: "history" },
    { text: 'Compte', icon: <FaUserAlt />, path: "Compte" },
    { text: 'Paramètres', icon: <FaCog />, path: "Paramètres" },
  ];
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Récupérer le nom de l'utilisateur depuis le localStorage
    const fullName = localStorage.getItem("userFullName");
    if (fullName) {
      setUserName(fullName);
    }
  }, []);

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
                <p className="text-sm text-gray-500 dark:text-gray-400">Utilisateur</p>
              </div>
            </div>
          )}
          <Link
            to="/"
            className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg"
          >
            <FaSignOutAlt className="text-xl" />
            {isExpanded && <span>Déconnexion</span>}
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

