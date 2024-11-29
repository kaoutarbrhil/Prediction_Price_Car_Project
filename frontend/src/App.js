import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import SideNavBar from "./pages/SideNavBar";
import Settings from "./pages/Settings";
import PredictionPage from "./pages/PredictionPage";
import Compte from "./pages/Compte";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route path="/" element={<HomePage/>} />

        

        {/* Route pour les pages non trouvées */}
        <Route path="*" element={<NotFound />} />

        <Route  element={<SideNavBar />}>
               
                <Route index path="/prediction" element={<PredictionPage />} />
                <Route  path="/Paramètres" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
                <Route  path="/Compte" element={<Compte />} />
               

            </Route>
            <Route  path="/login" element={<Login />} /> 
            <Route  path="/signup" element={<Signup />} /> 
      </Routes>
    </Router>
  );
};

export default App;