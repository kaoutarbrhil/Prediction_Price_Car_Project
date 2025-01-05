import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PredictionPage from '../pages/PredictionPage'; // Remplacez par le chemin réel du composant
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nMock'; // Assurez-vous d'importer une configuration i18n valide

jest.spyOn(console, "log").mockImplementation(() => {}); // Espionner console.log

const renderComponent = () => {
  render(
    <I18nextProvider i18n={i18n}>
      <PredictionPage />
    </I18nextProvider>
  );
};

describe("PredictionPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the welcome message and city selection", () => {
    renderComponent();

    // Vérifiez les textes principaux
    expect(screen.getByText(/Hello! Welcome to the prediction page\./i)).toBeInTheDocument();
    expect(screen.getByText(/Select a City/i)).toBeInTheDocument();

    // Vérifiez que chaque ville est affichée
    const cities = ["Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Jaipur"];
    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it("renders without a userId in localStorage and displays debug message", () => {
    renderComponent();

    // Vérifiez que le message de débogage est affiché
    expect(console.log).toHaveBeenCalledWith("user id is null");
  });
});
