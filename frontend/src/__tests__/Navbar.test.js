import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18nMock";
import Navbar from "../pages/Navbar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Navbar Component", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <Navbar />
        </I18nextProvider>
      </MemoryRouter>
    );

  it("renders the Navbar with logo and title", () => {
    renderComponent();
    expect(screen.getByAltText("Car")).toBeInTheDocument();
    expect(screen.getByText("PredictCar")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderComponent();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/features/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });
});
