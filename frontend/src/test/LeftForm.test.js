import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18nMock"; // Assurez-vous que le chemin est correct
import LeftForm from "../pages/LeftForm"; // Assurez-vous que le chemin est correct

describe("LeftForm Component", () => {
    const mockHandleInputChange = jest.fn();
    const mockFormData = {
      manufacturer: "",
      fuelType: "",
      bodyType: "",
      transmission: "",
      insurance: "",
      turboCharger: "",
      tyreType: "",
    };
  
    const renderWithI18n = (ui) => render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
  
    it("renders all form fields correctly", () => {
      renderWithI18n(<LeftForm formData={mockFormData} handleInputChange={mockHandleInputChange} />);
  
      expect(screen.getByText(/manufacturer/i)).toBeInTheDocument();
      expect(screen.getByText(/fuel type/i)).toBeInTheDocument();
      expect(screen.getByText(/body type/i)).toBeInTheDocument();
      expect(screen.getByText(/transmission/i)).toBeInTheDocument();
      expect(screen.getByText(/insurance/i)).toBeInTheDocument();
      expect(screen.getByText(/turbo charger/i)).toBeInTheDocument();
      expect(screen.getByText(/tyre type/i)).toBeInTheDocument();
    });
  
    it("calls handleInputChange on changing the manufacturer field", () => {
      renderWithI18n(<LeftForm formData={mockFormData} handleInputChange={mockHandleInputChange} />);
  
      const manufacturerSelect = screen.getByText(/manufacturer/i).nextSibling; // Sélectionner l'élément suivant (select)
      fireEvent.change(manufacturerSelect, { target: { value: "toyota" } });
  
      expect(mockHandleInputChange).toHaveBeenCalled();
    });
  
    it("displays the correct options for the turboCharger dropdown", () => {
      renderWithI18n(<LeftForm formData={mockFormData} handleInputChange={mockHandleInputChange} />);
  
      const turboChargerSelect = screen.getByText(/turbo charger/i).nextSibling;
      expect(turboChargerSelect).toBeInTheDocument();
      expect(turboChargerSelect).toHaveTextContent("Yes");
      expect(turboChargerSelect).toHaveTextContent("No");
      expect(turboChargerSelect).toHaveTextContent("Twin");
      expect(turboChargerSelect).toHaveTextContent("Turbo");
    });
  });