import React, { useState, useEffect } from "react";

const RightForm = ({ onCancel, formData: propFormData, setFormData }) => {
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
        console.log("propFormData : ",propFormData)
        console.log("defaultFormData : ",defaultFormData)
        // Vérifier si toutes les propriétés de propFormData sont vides
        const isPropFormDataEmpty = Object.values(propFormData).every(value => value === "");

        // Si propFormData est "vide" (toutes les propriétés sont vides), on utilise defaultFormData
        return isPropFormDataEmpty ? defaultFormData : propFormData; 
    });
    console.log("FormData : ",formData)

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
        // Si la valeur est un nombre, on la convertit en numérique
        const numericValue = value.trim() === "" ? "" : isNaN(value) ? value : parseFloat(value);
    
        setLocalFormData((prevData) => ({
            ...prevData,
            [name]: numericValue,
        }));
        setFormData(prevData => ({ ...prevData, [name]: numericValue }));
    };
    

    const handlePrediction = async () => {
        try {
            setError(null); // Réinitialiser les erreurs
            setPrediction(null); // Réinitialiser la prédiction

            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData }),
            });

            if (!response.ok) {
                throw new Error("Error in prediction. Please check the inputs.");
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setPrediction(data.predicted_price); // Met à jour la prédiction
        } catch (err) {
            setError(err.message); // Enregistre l'erreur
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
            <h1 className="text-red-700 text-2xl font-bold text-center mb-8">Please fill car specifications</h1>
            <form className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    {/* Model Year */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Model Year:</label>
                        <select
                            name="modelYear"
                            value={formData.modelYear}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
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
                        <label className="mb-2 text-sm font-medium">Kilometers Driven:</label>
                        <input
                            type="number"
                            name="kilometersDriven"
                            value={formData.kilometersDriven}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
                        />
                    </div>

                    {/* Number of Owners */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Number Of Owners:</label>
                        <select
                            name="ownerNo"
                            value={formData.ownerNo}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
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
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Engine Size (cc):</label>
                        <input
                            type="number"
                            name="engineSize"
                            value={formData.engineSize}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
                        />
                    </div>

                    {/* Torque */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Torque (Nm):</label>
                        <input
                            type="number"
                            name="torque"
                            value={formData.torque}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
                        />
                    </div>

                    {/* Max Power */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Max Power (bhp):</label>
                        <input
                            type="number"
                            name="maxPower"
                            value={formData.maxPower}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Gear Box */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Gear Box (Speeds):</label>
                        <input
                            type="number"
                            name="gearBox"
                            value={formData.gearBox}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
                        />
                    </div>

                    {/* Number of Cylinders */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Number of Cylinders:</label>
                        <input
                            type="number"
                            name="noOfCylinders"
                            value={formData.noOfCylinders}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
                        />
                    </div>

                    {/* Wheel Size */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Wheel Size:</label>
                        <input
                            type="number"
                            name="wheelSize"
                            value={formData.wheelSize}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Height */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Height (mm):</label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
                        />
                    </div>

                    {/* Cargo Volume */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Cargo Volume (liters):</label>
                        <input
                            type="number"
                            name="cargoVolume"
                            value={formData.cargoVolume}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-orange-500"
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
                        Predict Price
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
             {/* Résultat de la prédiction */}
             {prediction !== null && (
                <div className="mt-4 p-4 bg-green-700 rounded-lg text-center">
                    <p className="text-xl font-semibold">Predicted Price: ${prediction}</p>
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
