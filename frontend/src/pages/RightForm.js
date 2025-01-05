import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const RightForm = ({ onCancel, formData: propFormData, setFormData }) => {
    const { t } = useTranslation();
    // Valeurs par défaut à utiliser si propFormData est vide
    const defaultFormData = {
        modelYear: "",
        engineSize: 1400.0,
        kilometersDriven: 0.0,
        torque: 180.0,
        maxPower: 105.0,
        gearBox: 5,
        noOfCylinders: 4,
        wheelSize: 15.75,
        height: 1500.0,
        cargoVolume: 350.0,
        ownerNo: "",
    };

    // Utiliser `useState` pour initialiser formData avec les valeurs par défaut ou les props
    const [formData, setLocalFormData] = useState(() => {
        // Vérifier si toutes les propriétés de propFormData sont vides
        const isPropFormDataEmpty = Object.values(propFormData).every(value => value === "");

        // Si propFormData est "vide" (toutes les propriétés sont vides), on utilise defaultFormData
        return isPropFormDataEmpty ? defaultFormData : propFormData; 
    });
    console.log("FormData : ",formData)
    const [errors, seterrors] = useState({});

    // Mise à jour de formData si propFormData change
    useEffect(() => {
        const isPropFormDataEmpty = Object.values(propFormData).every(value => value === "");
        if (!isPropFormDataEmpty) {
            setLocalFormData(propFormData);
        }
    }, [propFormData]);

    const [prediction, setPrediction] = useState(null); // Stocke le prix prédit
    const [error, setError] = useState(null); // Stocke les erreurs éventuelles

    const modelYears = ["Select", ...Array.from({ length: 2025 - 1990 }, (_, i) => 1990 + i)];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const numericValue = value.trim() === "" ? "" : isNaN(value) ? value : parseFloat(value);
    
        // Mettre à jour formData
        setLocalFormData((prevData) => ({
            ...prevData,
            [name]: numericValue,
        }));
        setFormData((prevData) => ({
            ...prevData,
            [name]: numericValue,
        }));
    
        // Gérer les validations spécifiques
        const newerrors = { ...errors };
    
        if (name === "engineSize" && numericValue < 500) {
            newerrors.engineSize = t('engineSizeError');
        } else if (name === "torque" && numericValue < 50) {
            newerrors.torque = t('torqueError');
        } else if (name === "maxPower" && numericValue < 30) {
            newerrors.maxPower = t('maxPowerError');
        } else if (name === "gearBox" && numericValue < 3) {
            newerrors.gearBox = t('gearBoxError');
        } else if (name === "noOfCylinders" && numericValue < 2) {
            newerrors.noOfCylinders = t('noOfCylindersError');
        } else if (name === "wheelSize" && numericValue < 10) {
            newerrors.wheelSize = t('wheelSizeError');
        } else if (name === "height" && numericValue < 1000) {
            newerrors.height = t('heightError');
        } else {
            delete newerrors[name];
        }
    
        seterrors(newerrors);
    };
    
    

    const handlePrediction = async () => {
        try {
            setError(null); // Réinitialiser les erreurs
            setPrediction(null); // Réinitialiser la prédiction

            // Vérifier si tous les champs sont remplis
            const requiredFields = [
                "fuelType",
                "bodyType",
                "transmission",
                "ownerNo",
                "manufacturer",
                "modelYear",
                "insurance",
                "engineSize",
                "maxPower",
                "torque",
                "wheelSize",
                "noOfCylinders",
                "turboCharger",
                "height",
                "gearBox",
                "tyreType",
                "cargoVolume",
            ];

            const missingFields = requiredFields.filter(
                (field) => !formData[field] || formData[field] === ""
            );

            if (missingFields.length > 0) {
                setError(t('fieldsemptyerror'));
                return;
            }

    
            // Transformation des données avant de les envoyer
            const transformedData = {
                fuel_type: formData.fuelType,
                body_type: formData.bodyType,
                kilometers_driven: formData.kilometersDriven,
                transmission: formData.transmission,
                owner_no: formData.ownerNo,
                manufacturer: formData.manufacturer,
                model_year: formData.modelYear,
                insurance: formData.insurance,
                engine: formData.engineSize,
                max_power: formData.maxPower,
                torque: formData.torque,
                wheel_size: formData.wheelSize,
                no_of_cylinders: formData.noOfCylinders,
                turbo_charger: formData.turboCharger,
                height: formData.height,
                gear_box: formData.gearBox,
                tyre_type: formData.tyreType,
                cargo_volumn: formData.cargoVolume,
                city: "delhi",
            };

    
            const userId = localStorage.getItem('userId');  // Remplacez ceci par la méthode d'accès à l'ID de l'utilisateur
    
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": userId,  // Ajouter l'ID utilisateur dans l'en-tête
                },
                body: JSON.stringify(transformedData),
            });
    
            if (!response.ok) {
                throw new Error("Error in prediction. Please check the inputs.");
            }
    
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
    
            setPrediction(data.predicted_price);
        } catch (err) {
            setError(err.message);
        }
    };
    
    return (
        <div className="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg dark:text-white">
            <h1 className="text-blue-600 dark:text-red-700 text-2xl font-bold text-center mb-8">{t('carSpecificationsTitle')}</h1>
            <form className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    {/* Model Year */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">{t('modelYear')}</label>
                        <select
                            name="modelYear"
                            value={formData.modelYear}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                        >
                            {modelYears.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Kilometers Driven */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">{t('kilometersDriven')}</label>
                        <input
                            type="number"
                            name="kilometersDriven"
                            value={formData.kilometersDriven}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                        />
                    </div>

                    {/* Number of Owners */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">{t('ownerNo')}</label>
                        <select
                            name="ownerNo"
                            value={formData.ownerNo}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                        >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Engine Size */}
                    <div className="flex flex-col relative">
                        <label className="mb-2 text-sm font-medium">{t('engineSize')}</label>
                        <input
                            type="number"
                            name="engineSize"
                            value={formData.engineSize}
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-md ${
                                errors.engineSize ? "bg-red-50 border-red-500" : "bg-blue-50"
                            } dark:bg-gray-700 border border-gray-600`}
                        />
                        {errors.engineSize && (
                            <span className="text-xs text-red-500 absolute top-full mt-1">
                                {errors.engineSize}
                            </span>
                        )}
                    </div>

                    {/* Torque */}
                    <div className="flex flex-col relative">
                        <label className="mb-2 text-sm font-medium">{t('torque')}</label>
                        <input
                            type="number"
                            name="torque"
                            value={formData.torque}
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-md ${
                                errors.torque ? "bg-red-50 border-red-500" : "bg-blue-50"
                            } dark:bg-gray-700 border border-gray-600`}
                        />
                        {errors.torque && (
                            <span className="text-xs text-red-500 absolute top-full mt-1">
                                {errors.torque}
                            </span>
                        )}
                    </div>

                    {/* Max Power */}
                    <div className="flex flex-col relative">
                        <label className="mb-2 text-sm font-medium">{t('maxPower')}</label>
                        <input
                            type="number"
                            name="maxPower"
                            value={formData.maxPower}
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-md ${
                                errors.maxPower ? "bg-red-50 border-red-500" : "bg-blue-50"
                            } dark:bg-gray-700 border border-gray-600`}
                        />
                        {errors.maxPower && (
                            <span className="text-xs text-red-500 absolute top-full mt-1">
                                {errors.maxPower}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Gear Box */}
                    <div className="flex flex-col relative">
                        <label className="mb-2 text-sm font-medium">{t('gearBox')}</label>
                        <input
                            type="number"
                            name="gearBox"
                            value={formData.gearBox}
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-md ${
                                errors.gearBox ? "bg-red-50 border-red-500" : "bg-blue-50"
                            } dark:bg-gray-700 border border-gray-600`}
                        />
                        {errors.gearBox && (
                            <span className="text-xs text-red-500 absolute top-full mt-1">
                                {errors.gearBox}
                            </span>
                        )}
                    </div>

                    {/* Number of Cylinders */}
                    <div className="flex flex-col relative">
                        <label className="mb-2 text-sm font-medium">{t('noOfCylinders')}</label>
                        <input
                            type="number"
                            name="noOfCylinders"
                            value={formData.noOfCylinders}
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-md ${
                                errors.noOfCylinders ? "bg-red-50 border-red-500" : "bg-blue-50"
                            } dark:bg-gray-700 border border-gray-600`}
                        />
                        {errors.noOfCylinders && (
                            <span className="text-xs text-red-500 absolute top-full mt-1">
                                {errors.noOfCylinders}
                            </span>
                        )}
                    </div>

                    {/* Wheel Size */}
                    <div className="flex flex-col relative">
                        <label className="mb-2 text-sm font-medium">{t('wheelSize')}</label>
                        <input
                            type="number"
                            name="wheelSize"
                            value={formData.wheelSize}
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-md ${
                                errors.wheelSize ? "bg-red-50 border-red-500" : "bg-blue-50"
                            } dark:bg-gray-700 border border-gray-600`}
                        />
                        {errors.wheelSize && (
                            <span className="text-xs text-red-500 absolute top-full mt-1">
                                {errors.wheelSize}
                            </span>
                        )}
                    </div>

                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Height */}
                    <div className="flex flex-col relative">
                        <label className="mb-2 text-sm font-medium">{t('height')}</label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-md ${
                                errors.height ? "bg-red-50 border-red-500" : "bg-blue-50"
                            } dark:bg-gray-700 border border-gray-600 dark:text-white`}
                        />
                        {errors.height && (
                            <span className="text-xs text-red-500 absolute top-full mt-1">
                                {errors.height}
                            </span>
                        )}
                    </div>

                    {/* Cargo Volume */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">{t('cargoVolume')}</label>
                        <input
                            type="number"
                            name="cargoVolume"
                            value={formData.cargoVolume}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Boutons */}
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={handlePrediction} // Fonction de prédiction
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        {t('predictPrice')}
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={onCancel}
                    >
                        {t('cancel')}
                    </button>
                </div>

            </form>

             {/* Résultat de la prédiction */}
             {prediction !== null && (
                <div className="mt-4 p-4 bg-green-700 rounded-lg text-center">
                    <p className="text-xl font-bold text-white">{prediction.toFixed(2)} lakhs ₹</p>
                </div>
            )}

            {/* Affichage des erreurs */}
            {error && (
                <div className="mt-4 p-4 bg-red-700 rounded-lg text-center">
                    <p className="text-sm font-semibold">{error}</p>
                </div>
            )}
        </div>
    );
};

export default RightForm;

	
