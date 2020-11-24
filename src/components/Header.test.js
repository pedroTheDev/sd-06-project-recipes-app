import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Header from './Header';

describe('Test Header.js', () => {
  it('tests if there is a h1 "Comidas"', () => {
    const { getByRole, getByText } = renderWithRouter(<Header />);
    const heading = getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    const title = getByText(/Comidas/i);
    expect(title).toBeInTheDocument();
  });
  it('tests if there is a profile icon');
  it('tests if the user is redirected when clicked in the profile picture', () => {

  });
});
