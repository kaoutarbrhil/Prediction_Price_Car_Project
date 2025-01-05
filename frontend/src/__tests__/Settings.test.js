import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../pages/Settings';

// Mock de la traduction
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('Settings Component', () => {
  test('renders Settings component with theme and language options', () => {
    render(<Settings />);

    // Vérifier si le titre est affiché
    expect(screen.getByText(/menu.settings/i)).toBeInTheDocument();

    // Vérifier si le bouton de thème est affiché
    expect(screen.getByRole('button', { name: /light/i })).toBeInTheDocument();

    // Vérifier si le sélecteur de langue est affiché
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
  });

  test('toggles theme between light and dark', () => {
    render(<Settings />);
    const themeButton = screen.getByRole('button', { name: /light/i });

    // Vérifier le thème initial
    expect(themeButton).toHaveTextContent(/light/i);

    // Simuler un clic pour changer le thème
    fireEvent.click(themeButton);

    // Vérifier le thème après clic
    expect(themeButton).toHaveTextContent(/dark/i);
  });
});
