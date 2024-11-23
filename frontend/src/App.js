import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import SideNavBar from "./pages/SideNavBar";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route path="/" element={<HomePage/>} />

        

        {/* Route pour les pages non trouvées */}
        <Route path="*" element={<NotFound />} />

        <Route  element={<SideNavBar />}>
                <Route index path="/dashboard" element={<Dashboard />} />
                <Route  path="/Paramètres" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
            </Route>
      </Routes>
    </Router>
  );
};

export default App;
