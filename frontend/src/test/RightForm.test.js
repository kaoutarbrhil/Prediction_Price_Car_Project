import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RightForm from "../pages/RightForm";

// Mock de la traduction
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("RightForm Component", () => {
  const mockOnCancel = jest.fn();
  const mockSetFormData = jest.fn();
  const mockFormData = {
    modelYear: "2020",
    engineSize: 1500,
    kilometersDriven: 10000,
    ownerNo: "1",
    torque: 200,
    maxPower: 100,
    gearBox: 5,
    noOfCylinders: 4,
    wheelSize: 16,
    height: 1500,
    cargoVolume: 400,
  };

  it("calls onCancel when the cancel button is clicked", () => {
    render(
      <RightForm
        onCancel={mockOnCancel}
        formData={mockFormData}
        setFormData={mockSetFormData}
      />
    );

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
