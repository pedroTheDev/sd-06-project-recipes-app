import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import AppProvider from '../provider/AppProvider';

describe('App:', () => {
  beforeAll(() => {
    const email = 'email@email.com';
    localStorage.user = JSON.stringify({ email });
  });
  it('Renders the home page on the path "/"', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);
  });
});
