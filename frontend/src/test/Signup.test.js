import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../pages/Signup";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));
  
  describe("Signup Component", () => {
    const mockNavigate = jest.fn();
  
    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);
    });
  
    it("renders the form with initial data", () => {
      render(
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      );
  
      expect(screen.getByLabelText(/signup.username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/signup.email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/signup.password/i)).toBeInTheDocument();
    });
  });
  