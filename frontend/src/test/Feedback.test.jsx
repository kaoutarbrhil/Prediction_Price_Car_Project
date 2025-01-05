import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18nMock from "./i18nMock"; // Chemin vers le fichier mock i18n
import FeedBack from "../pages/Components/Home/Feedback";

describe("FeedBack Component", () => {
  it("renders the feedback form correctly", () => {
    render(
      <I18nextProvider i18n={i18nMock}>
        <FeedBack />
      </I18nextProvider>
    );

    // Vérifier que les champs du formulaire sont affichés
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Message/i)).toBeInTheDocument();
    expect(screen.getByText(/Send/i)).toBeInTheDocument();
  });
});