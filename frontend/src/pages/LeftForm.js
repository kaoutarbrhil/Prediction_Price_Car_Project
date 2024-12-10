import React from 'react';
import { useTranslation } from 'react-i18next';


const manufacturers = [
  'kia', 'maruti', 'nissan', 'hyundai', 'honda', 'mercedes-benz', 'bmw', 'ford', 'tata', 'jeep',
  'toyota', 'audi', 'mahindra', 'renault', 'chevrolet', 'volkswagen', 'datsun', 'fiat', 'land rover',
  'mg', 'skoda', 'isuzu', 'mini', 'volvo', 'jaguar', 'citroen', 'mitsubishi', 'mahindra renault',
  'mahindra ssangyong', 'lexus', 'hindustan motors', 'opel', 'porsche'
];

const LeftForm = ({ formData, handleInputChange }) => {
    const { t } = useTranslation();
    return (
        <div className="p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-md">
            <form className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">{t('manufacturer')}</label>
                    <select
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                    >
                        <option value="">Select</option>
                        {manufacturers.map((manufacturer) => (
                            <option key={manufacturer} value={manufacturer}>
                                {manufacturer.charAt(0).toUpperCase() + manufacturer.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">{t('fuelType')}</label>
                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                    >
                        <option value="">Select</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="cng">CNG</option>
                        <option value="lpg">LPG</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">{t('bodyType')}</label>
                    <select
                        name="bodyType"
                        value={formData.bodyType}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                    >
                        <option value="">Select</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="sedan">Sedan</option>
                        <option value="muv">MUV</option>
                        <option value="convertibles">Convertibles</option>
                        <option value="coupe">Coupe</option>
                        <option value="pickup trucks">Pickup Trucks</option>
                        <option value="wagon">Wagon</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">{t('transmission')}</label>
                    <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                    >
                        <option value="">Select</option>
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">{t('insurance')}</label>
                    <select
                        name="insurance"
                        value={formData.insurance}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                    >
                        <option value="">Select</option>
                        <option value="third party">Third Party</option>
                        <option value="comprehensive">Comprehensive</option>
                        <option value="zero dep">Zero Dep</option>
                        <option value="not available">Not Available</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">{t('turboCharger')}</label>
                    <select
                        name="turboCharger"
                        value={formData.turboCharger}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                    >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="twin">Twin</option>
                        <option value="turbo">Turbo</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">{t('tyreType')}</label>
                    <select
                        name="tyreType"
                        value={formData.tyreType}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md bg-blue-50 dark:bg-gray-700 border border-gray-600 dark:text-white focus:ring dark:focus:ring-orange-400 focus:ring-blue-400"
                    >
                        <option value="">Select</option>
                        <option value="tubeless radial">Tubeless Radial</option>
                        <option value="tubeless">Tubeless</option>
                        <option value="run-flat">Run-flat</option>
                        <option value="radial">Radial</option>
                        <option value="tubeless runflat">Tubeless Runflat</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default LeftForm;
