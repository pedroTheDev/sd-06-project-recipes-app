import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Profile } from '../pages';

describe('Testar header da tela de perfil', () => {
  it(`Verificar se possui 1 botão com data-testid="profile-top-btn" 
    e se ao clicar redireciona para "/perfil"`, () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    history.push('/perfil');

    const profileButton = getByTestId('profile-top-btn');
    fireEvent.click(profileButton);
    expect(profileButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Verificar se existe o título "Perfil" no header', () => {
    const { getByText, history } = renderWithRouter(<Profile />);
    history.push('/perfil');

    const profileTitle = getByText(/Perfil/i);
    expect(profileTitle).toBeInTheDocument();
  });

  it('Verificar se não possui o botão com data-testid="search-top-btn"', () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    history.push('/perfil');

    const profileSearchButton = getByTestId('search-top-btn');
    expect(profileSearchButton).not.toBeInTheDocument();
  });
});

describe('Testar conteúdo da tela de perfil ', () => {
  // it('Verificar email, LocalStorage', () => {

  // });

  it(`Verificar se possui o botão com data-testid="profile-done-btn" 
    e se ao clicar redireciona para "/receitas-feitas"`, () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    history.push('/perfil');

    const profileDoneButton = getByTestId('profile-done-btn');
    fireEvent.click(profileDoneButton);

    expect(profileDoneButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it(`Verificar se possui o botão com data-testid="profile-favorite-btn" 
    e se ao clicar redireciona para "/receitas-favoritas"`, () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    history.push('/perfil');

    const profileFavoriteButton = getByTestId('profile-favorite-btn');
    fireEvent.click(profileFavoriteButton);

    expect(profileFavoriteButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  it(`Verificar se possui o botão com data-testid="profile-logout-btn" 
    e se ao clicar redireciona para "/"`, () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    history.push('/perfil');

    const profileLogoutButton = getByTestId('profile-logout-btn');
    fireEvent.click(profileLogoutButton);

    expect(profileLogoutButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });
});

describe('Testar footer da tela de perfil', () => {
  it(`Verificar se possui o botão com data-testid="drinks-bottom-btn" 
    e se ao clicar redireciona para "/bebidas"`, () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    history.push('/comidas');

    const drinksButton = getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksButton);

    expect(drinksButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/bebidas');
  });

  it(`Verificar se possui o botão com data-testid="explore-bottom-btn" 
    e se ao clicar redireciona para "/explorar"`, () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    history.push('/comidas');

    const exploreButton = getByTestId('explore-bottom-btn');
    fireEvent.click(exploreButton);

    expect(exploreButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/explorar');
  });

  it(`Verificar se possui o botão com data-testid="food-bottom-btn" 
    e se ao clicar redireciona para "/comidas"`, () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    history.push('/bebidas');

    const mealsButton = getByTestId('food-bottom-btn');
    fireEvent.click(mealsButton);

    expect(mealsButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/comidas');
  });
});
