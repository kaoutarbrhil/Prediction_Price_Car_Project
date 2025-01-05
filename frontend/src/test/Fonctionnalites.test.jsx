import React from "react";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18nMock"; // Chemin vers le fichier i18nMock
import Fonctionnalites from "../pages/Components/Home/Fonctionnalites";

describe("Fonctionnalites Component", () => {
  it("renders features correctly", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Fonctionnalites />
      </I18nextProvider>
    );

    // Vérifier que les fonctionnalités sont affichées
    expect(
      screen.getByText("Free prediction of imported car prices")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Advanced artificial intelligence algorithms")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Prediction history accessible with one click")
    ).toBeInTheDocument();
    expect(
      screen.getByText("An intuitive interface accessible to everyone")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fast and accurate calculation in real-time")
    ).toBeInTheDocument();
    expect(screen.getByText("Accessible 24/7 from anywhere")).toBeInTheDocument();
    expect(screen.getByText("And much more to come...")).toBeInTheDocument();
  });

  it("renders advantages correctly", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Fonctionnalites />
      </I18nextProvider>
    );

    // Vérifier que les avantages sont affichés
    expect(screen.getByText("Accurate prediction of car prices")).toBeInTheDocument();
    expect(screen.getByText("Access to prediction history")).toBeInTheDocument();
    expect(screen.getByText("Simple and easy-to-use interface")).toBeInTheDocument();
    expect(screen.getByText("Predictions based on real data")).toBeInTheDocument();
    expect(screen.getByText("Free and no subscription required")).toBeInTheDocument();
    expect(screen.getByText("Fast and secure account creation")).toBeInTheDocument();
    expect(screen.getByText("Instant predictions with reliable results")).toBeInTheDocument();
  });
});
