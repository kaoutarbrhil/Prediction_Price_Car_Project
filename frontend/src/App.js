import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import NotFound from "./pages/NotFound";
import SideNavBar from "./pages/SideNavBar";
import Settings from "./pages/Settings";
import PredictionPage from "./pages/PredictionPage";
import Compte from "./pages/Compte";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Acceuil from "./pages/Components/Home/Accueil";
import PredictionHistoryPage from "./pages/PredictionHistoryPage";
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {
  const userIdBool = localStorage.getItem('userId');
  console.log("userIdBool est : " + userIdBool);
  userIdBool ? console.log("userIdBool est non nul") : console.log("userIdBool est nul");
  return (
    <Router>
      <Routes>


        {userIdBool ? (
            <Route  element={<SideNavBar />}>
                  
                    <Route index path="/prediction" element={<PredictionPage />} />
                    <Route  path="/Paramètres" element={<Settings />} />
                    <Route path="*" element={<PredictionPage />} />
                    <Route  path="/Compte" element={<Compte />} />
                  
              
                    <Route  path="/history" element={<PredictionHistoryPage/>} />
                  
            </Route>
        ) : (
            <Route>
              {/* Route pour la page de connexion */}
                <Route path="/" element={<Layout><Acceuil /></Layout>} />      
        
        {/* Route pour les pages non trouvées */}
                {/*<Route path="*" element={<NotFound />} />*/}
                <Route  path="/login" element={<Login />} /> 
                <Route  path="/signup" element={<Signup />} />
        
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/prediction" element={<Navigate to="/login"/>}/>
                <Route path="/Paramètres" element={<Navigate to="/login"/>}/>
                <Route path="/Compte" element={<Navigate to="/login"/>}/>
                <Route path="/history" element={<Navigate to="/login"/>}/>
            </Route>
        )
        }
      </Routes>
    </Router>
  );
};

export default App;