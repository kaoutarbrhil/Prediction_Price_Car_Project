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


import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import '../css/SideNavBar.css';
import { FaChartLine, FaHistory, FaUserAlt, FaCog, FaBars, FaSignOutAlt } from 'react-icons/fa';

export default function SideNavBar() {
    const [isExpanded, setExpandState] = useState(false);

    const menuItems = [
        { text: 'Prédiction', icon: <FaChartLine className="menu-icon" />, path: "prediction" },
        { text: 'Historique', icon: <FaHistory className="menu-icon" />, path: "history" },
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
}
