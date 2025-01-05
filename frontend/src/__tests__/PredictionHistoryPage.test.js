import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PredictionHistory from '../pages/PredictionHistoryPage';

describe('PredictionHistory Component', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'userId') return '123';
      return null;
    });

    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              manufacturer: 'Toyota',
              fuel_type: 'Petrol',
              transmission: 'Manual',
              model_year: 2020,
              kms_driven: 15000,
              num_owners: 1,
              predicted_price: '$15,000',
              timestamp: '2023-12-01T10:00:00Z',
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the title and table structure', async () => {
    render(<PredictionHistory />);

    // Vérifier le titre
    expect(screen.getByText(/PredictionHistoryTitle/i)).toBeInTheDocument();

    // Attendre que les données soient chargées et vérifier leur affichage
    await waitFor(() => {
      expect(screen.getByText('Toyota')).toBeInTheDocument();
      expect(screen.getByText('Petrol')).toBeInTheDocument();
      expect(screen.getByText('Manual')).toBeInTheDocument();
      expect(screen.getByText('2020')).toBeInTheDocument();
      expect(screen.getByText('15000')).toBeInTheDocument();
      expect(screen.getAllByText('1').length).toBe(2); // Vérifie que deux colonnes contiennent `1`
      expect(screen.getByText('$15,000')).toBeInTheDocument();
      expect(screen.getByText('01/12/2023 11:00:00')).toBeInTheDocument();
    });
  });
});
