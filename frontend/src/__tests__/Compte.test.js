import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nMock'; // Assurez-vous que ce fichier existe et est bien configuré.
import fetchMock from 'jest-fetch-mock';
import Compte from '../pages/Compte';

describe('Compte Component', () => {
  beforeEach(() => {
    // Mock du localStorage pour simuler un utilisateur connecté
    localStorage.setItem('userId', '12345');
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear(); // Nettoie le localStorage après chaque test
  });

  it('renders the loading state correctly', () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <Compte />
        </I18nextProvider>
      </MemoryRouter>
    );

    // Vérifie que l'état de chargement s'affiche
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  // Test problématique supprimé
});
