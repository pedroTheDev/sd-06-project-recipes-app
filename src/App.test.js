import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';

describe('Test App.js', () => {
  afterEach(cleanup);
  it('Renders a login page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const getEmail = getByText(/Email/i);
    expect(getEmail).toBeInTheDocument();
  });

  it('Renders Login page when the route is "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    const title = getByText(/Bem-vindo chef!/i);
    expect(title).toBeInTheDocument();
  });

  it('tests if use is redirected when logged in', () => {
    const { history, getByText } = renderWithRouter(< App />);
    const { pathname } = history.location;
    const loginBtn = getByText(/Entrar/i);
    fireEvent.click(loginBtn);
    expect(pathname).toBe('/comidas');
    expect(loginBtn).toBeInTheDocument();
  });
});

