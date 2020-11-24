import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Profile';
import AppProvider from '../provider/AppProvider';

describe('A página de perfil', () => {
  beforeAll(() => {
    const email = 'email@email.com';
    localStorage.user = JSON.stringify({ email });
  });
  it('Possui três botões: Receitas Favoritas, Receitas Feitas e Sair', () => {
    renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );
    const doneBtn = screen.queryByTestId('profile-done-btn');
    const favoriteBtn = screen.queryByTestId('profile-favorite-btn');
    const logoutBtn = screen.queryByTestId('profile-logout-btn');
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  it('O botão Receitas Favoritas encaminha para a página de mesmo nome', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );
    const button = screen.queryByTestId('profile-favorite-btn');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
  });
  it('O botão Receitas Feitas encaminha para a página de mesmo nome', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );
    const button = screen.queryByTestId('profile-done-btn');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });
  it('O botão de Log Out encaminha para a página de login', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );
    const button = screen.queryByTestId('profile-logout-btn');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
