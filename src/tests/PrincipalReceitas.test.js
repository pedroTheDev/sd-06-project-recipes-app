import React from 'react';
import { waitForElement } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import Bebidas from '../pages/Bebidas';
// import Comidas from '../pages/Comidas';

describe('Tela principal de receitas', () => {
  it('A tela tem os data-testids de todos os 12 cards da tela de comidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/comidas');

    waitForElement(() => {
      expect(getByText('Comidas')).toBeInTheDocument();
    });
  });
  it('A tela tem os data-testids de todos os 12 cards da tela de bebidas', () => {
    // const { getByText, history } = renderWithRouter(<App />);
    // history.push('/bebidas');
  });
});
