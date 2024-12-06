import React, { useState } from "react";
import LeftForm from "./LeftForm";
import RightForm from "./RightForm";

const cities = [
    { name: "Delhi", image: require("../img/delhi.jpeg") },
    { name: "Bangalore", image: require("../img/bangalore.jpeg") },
    { name: "Chennai", image: require("../img/chennai.jpeg") },
    { name: "Hyderabad", image: require("../img/hyderabad.jpeg") },
    { name: "Kolkata", image: require("../img/kolkata.jpeg") },
    { name: "Jaipur", image: require("../img/jaipur.jpeg") },
];

export default function PredictionPage() {

    const user_id = localStorage.getItem('userId');
    console.log("user ID is : " +user_id);
    user_id ? console.log("user id is not null") : console.log("user id is null") 

    const [selectedCity, setSelectedCity] = useState(null);
    const [formData, setFormData] = useState({
        manufacturer: "",
        fuelType: "",
        bodyType: "",
        transmission: "",
        insurance: "",
        turboCharger: "",
        tyreType: "",
        modelYear: "",  // La valeur par défaut peut être vide
        engineSize: 1400.0,  // Valeur par défaut
        gearBox: 5,  // Valeur par défaut
        height: 1500.0,  // Valeur par défaut
        kilometersDriven: 0.0,  // Valeur par défaut
        torque: 180.0,  // Valeur par défaut
        noOfCylinders: 4,  // Valeur par défaut
        cargoVolume: 350.0,  // Valeur par défaut
        ownerNo: "",
        maxPower: 105.0,  // Valeur par défaut
        wheelSize: 15.75,
    });

    const handleCancel = () => {
        setSelectedCity(null); // Réinitialiser la ville sélectionnée
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
    };

    return (
        <div className="min-h-screen text-gray-700 dark:text-white p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Bonjour ! Bienvenue sur la page des prédictions.
            </h1>

            {/* Sélection de la ville */}
            {!selectedCity && (
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4 text-blue-600">Select a City:</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {cities.map((city) => (
                            <div
                                key={city.name}
                                className="cursor-pointer border border-blue-300 rounded-lg p-4 dark:bg-gray-800 bg-white hover:bg-blue-100 hover:shadow-xl dark:hover:bg-blue-800 transition-all ease-in-out duration-200"
                                onClick={() => handleCitySelect(city.name)}
                            >
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="w-40 h-24 object-cover rounded-md mb-2"
                                />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{city.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {/* Formulaires */}
            {selectedCity && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        City selected: <span className="text-orange-500">{selectedCity}</span>
                    </h2>
                    <div className="grid grid-cols-4 gap-8">
                        {/* Left Form: 1/4 */}
                        <div className="col-span-1">
                            <LeftForm formData={formData} handleInputChange={handleInputChange} />
                        </div>

                        {/* Right Form: 3/4 */}
                        <div className="col-span-3">
                            <RightForm
                                formData={formData}
                                setFormData={setFormData}
                                onCancel={handleCancel}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
