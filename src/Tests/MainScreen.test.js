import React from 'react';
import { waitForElement } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
// import MainScreen from '../Components/MainScreen';
import App from '../App';
import mockedFetch from '../../cypress/mocks/fetch';
import MainScreen from '../Components/MainScreen';

describe('Teste componente Main Screen - comidas', () => {
  it('A tela tem os data-testids de todos os 12 cards da tela de comidas', async () => {
    const { getByTestId, history } = renderWithRouter(<MainScreen />);
    jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);
    // history.push('/comidas');
    // expect(history.location.pathname).toBe('/comidas');
    await waitForElement(() => {
      const card = getByTestId('0-card-img');
      expect(card).toBeInTheDocument();
    });
  });
});
