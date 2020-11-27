import React from 'react';
import { getByAltText, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import Comidas from '../pages/Comidas';
import renderWithRouter from './RenderWithRouter';
import Provider from '../hooks/Provider';

describe('Footer test', () => {
  it('test button explore in footer.js', () => {
    const { history, getByTestId } = renderWithRouter(<Comidas />);

    const button = getByTestId('search-top-btn');

    fireEvent.click(button);

    const imput = screen.getByText(/Primeira Letra/i);

    expect(imput).toBeInTheDocument();
  });
});
