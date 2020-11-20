import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App:', () => {
  it('Renders the home page on the path "/"', () => {
    renderWithRouter(<App />);
  });
});
