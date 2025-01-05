import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18n from "./i18nMock"; // Assurez-vous que le chemin est correct
import Login from "../pages/Login"; // Assurez-vous que le chemin est correct

describe("Login Component", () => {
    const renderComponent = () =>
      render(
        <MemoryRouter>
          <I18nextProvider i18n={i18n}>
            <Login setUserId={() => {}} />
          </I18nextProvider>
        </MemoryRouter>
      );
  
    it("renders the login form", () => {
      renderComponent();
  
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    });
  });
  