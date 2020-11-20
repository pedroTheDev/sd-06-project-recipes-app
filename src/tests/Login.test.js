import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';
import { screen, fireEvent } from '@testing-library/react';

describe('Login test', () => {
  it('test about a pathname is /', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  })

  it('test if Login words have in screen', () => {
    renderWithRouter(<App />);
    const login = screen.getByText(/Login/i)
    
    expect(login).toBeInTheDocument();
  })

})