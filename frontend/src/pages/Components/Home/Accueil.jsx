import React from 'react';
import 'tailwindcss/tailwind.css';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import FeedBack from "./Feedback";
import Fonctionnalites from './Fonctionnalites';
import carImage from '../../../MBCAN-2022-AMG-GT53-4DR-COUPE-AVP-DR.webp';
import car1 from '../../../img/download.jpg'
import car2 from '../../../img/images1.jpg'
import car3 from '../../../img/images2.jpg'
import car4 from '../../../img/images.jpg'

const Acceuil = () => {
  
    localStorage.setItem('userId', '');
    const user_id = localStorage.getItem('userId');
    console.log("user ID is : " +user_id);
    user_id ? console.log("user id is not null") : console.log("user id is null")  

    const navigate = useNavigate();

    const handleClick = () => {
      navigate("/signup");
    };

  return (
    <div>

      {/* Section 1 */}
      <div id="acceuil" className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 py-12 lg:px-8 border mt-11">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative">
          <div style={{ width: '1000px', height: '400px' }}>
            <img
              src={carImage}
              alt="Car"
              //className="rounded-lg w-full h-full"
            />
          </div>
          <div className="md:w-1/2 flex flex-col items-start ml-4">
            <h1 className="md:text-5xl text-3xl font-bold text-white mb-4">
              Prédisez le Prix Idéal de Votre Voiture
            </h1>
            <p className="text-white mb-6">
              Exploitez la puissance de l'IA pour analyser les tendances du marché et déterminer les prix justes des voitures.
            </p>
            <div className="flex space-x-4 mb-6">
              <ScrollLink to="offre" smooth={true} duration={500}>
              <button
                onClick={handleClick}
                className="bg-yellow-500 text-white px-6 py-3 rounded transition-all duration-300 ease-in-out hover:bg-yellow-400 transform hover:scale-105 shadow-lg"
                >
                Essayez Maintenant
                </button>
              </ScrollLink>
            </div>
            <div className="flex flex-col items-center mb-6">
              <div className="flex space-x-4">
                <img
                  alt="Car 1"
                  src={car1}
                  className="inline-block h-20 w-20 rounded-full ring-2 ring-white border-2 border-white"
                />
                <img
                  alt="Car 2"
                  src={car2}
                  className="inline-block h-20 w-20 rounded-full ring-2 ring-white border-2 border-white"
                />
                <img
                  alt="Car 3"
                  src={car3}
                  className="inline-block h-20 w-20 rounded-full ring-2 ring-white border-2 border-white"
                />
                <img
                  alt="Car 4"
                  src={car4}
                  className="inline-block h-20 w-20 rounded-full ring-2 ring-white border-2 border-white"
                />
              </div>
              <p className="text-lg text-white mb-4 font-semibold mt-4">
                Trouvez le prix parfait pour votre voiture dès aujourd'hui !
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 7 */}
      <section className="dark:bg-gray-800">
        <Fonctionnalites />
      </section>

      {/* Section 9 */}
      <div id="Questions">
        <FeedBack />
      </div>
    </div>
  );
};

export default Acceuil;
