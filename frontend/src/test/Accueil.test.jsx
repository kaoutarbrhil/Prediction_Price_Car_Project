import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18n from "./i18nMock"; // Utiliser le fichier i18nMock
import Accueil from "../pages/Components/Home/Accueil";

describe("Accueil Component", () => {
  it("renders the welcome section correctly", () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <Accueil />
        </I18nextProvider>
      </MemoryRouter>
    );

    // Vérifier que les textes traduits sont affichés
    expect(screen.getByText("Predict the Ideal Price of Your Car")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Leverage AI to analyze market trends and determine fair car prices."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Find the perfect price for your car today!")).toBeInTheDocument();

    // Vérifier que les images sont affichées
    expect(screen.getByAltText("Car")).toBeInTheDocument();
    expect(screen.getByAltText("Car 1")).toBeInTheDocument();
    expect(screen.getByAltText("Car 2")).toBeInTheDocument();
    expect(screen.getByAltText("Car 3")).toBeInTheDocument();
    expect(screen.getByAltText("Car 4")).toBeInTheDocument();
  });

  it("renders Fonctionnalites and FeedBack components", () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <Accueil />
        </I18nextProvider>
      </MemoryRouter>
    );

    // Vérifier que Fonctionnalites est rendu
    expect(screen.getByText("Free prediction of imported car prices")).toBeInTheDocument();
    expect(screen.getByText("Advanced artificial intelligence algorithms")).toBeInTheDocument();

    // Vérifier que FeedBack est rendu
    expect(screen.getByText("Get in touch with our sales team")).toBeInTheDocument();
  });
});
