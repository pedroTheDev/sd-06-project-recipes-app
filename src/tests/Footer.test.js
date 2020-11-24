/*
-faz roteamento para /bebidas ao clicar no ícone de bebidas[ok]
-faz roteamento para /explorar ao clicar no ícone de explorar[ok]
-faz o roteamento para /comidas ao clicar no ícone de comida[ok]
-verifica se existe o data-testid="footer" no documento [ok]
-verifica se existe o data-testid="drinks-bottom-btn" na imagem de bebidas [ok]
-verifica se existe o data-testid="explore-bottom-btn" na imagem de exploração [ok]
-verifica se existe o data-testid="food-bottom-btn" na imagem de comida [ok]
*/
import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Footer from '../components/Footer';

describe('teste component Footer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('verifica se existem o ids no componente Footer', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const btnFood = getByTestId('food-bottom-btn');
    const btnExplore = getByTestId('explore-bottom-btn');
    const btnDrink = getByTestId('drinks-bottom-btn');
    const foot = getByTestId('footer');
    expect(btnFood).toBeInTheDocument();
    expect(btnExplore).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
    expect(foot).toBeInTheDocument();
  });

  it('verifica o link para rota /bebidas', () => {
    const { history, getByAltText } = renderWithRouter(<Footer />);
    fireEvent.click(getByAltText(/drink/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('verifica o link para rota /explorar', () => {
    const { history, getByAltText } = renderWithRouter(<Footer />);
    fireEvent.click(getByAltText(/explore/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  it('verifica o link para rota /comidas', () => {
    const { history, getByAltText } = renderWithRouter(<Footer />);
    fireEvent.click(getByAltText(/food/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
