import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Fonctionnalites from '../pages/Components/Home/Fonctionnalites';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; // Assurez-vous que le chemin vers votre fichier i18n est correct.

describe('Fonctionnalites Component', () => {
  test('renders the features section with correct text', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Fonctionnalites />
      </I18nextProvider>
    );

    // Vérifier que le titre des fonctionnalités est affiché
    const featuresTitle = screen.getByText(/Ce que vous gagnez avec PredictCar/i);
    expect(featuresTitle).toBeInTheDocument();

    // Vérifier que les icônes et descriptions des fonctionnalités sont affichées
    const features = [
      '🚗',
      '🧠',
      '📂',
      '🌍',
      '⚡',
      '⌚',
      '➕',
    ];
    features.forEach((icon) => {
      expect(screen.getByText(icon)).toBeInTheDocument();
    });
  });

  test('renders the advantages section with correct table', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Fonctionnalites />
      </I18nextProvider>
    );

    // Vérifier que le titre des avantages est affiché
    const advantagesTitle = screen.getByText(/Pourquoi PredictCar plutôt qu'une autre/i);
    expect(advantagesTitle).toBeInTheDocument();

    // Vérifier que les lignes de la table sont présentes
    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBeGreaterThan(1); // Titre + contenu

    // Vérifier un contenu spécifique
    expect(screen.getByText(/Prédiction précise des prix de voiture/i)).toBeInTheDocument();
  });

  test('renders the "À venir" tag for comingSoon features', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Fonctionnalites />
      </I18nextProvider>
    );

    // Vérifier la présence du tag "À venir"
    const comingSoonTag = screen.queryByText(/À venir/i);
    expect(comingSoonTag).not.toBeInTheDocument(); // Aucun "comingSoon" dans vos données actuelles
  });
});
