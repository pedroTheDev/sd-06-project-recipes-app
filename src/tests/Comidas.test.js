import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import renderWithRouter from './services/renderWithRouter';
import Comidas from '../pages/Comidas';
import mockFetch from './mocks/fetch';

describe('A página de comidas: ', () => {

  beforeAll(() => jest.spyOn(global, 'fetch'));
  beforeEach(() => global.fetch.mockImplementation(mockFetch));

  it('deve ter um header com o título "Comidas"', () => {
    const {
      history,
      getByTestId,
      getByRole,
      getByAltText,
    } = renderWithRouter(<Comidas />);

    const headerElement = getByRole('banner');
    const searchIcon = getByAltText('search');
    const profileIcon = getByAltText('profile access');
    const pageTitle = getByTestId('page-title');

    expect(headerElement).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

    fireEvent.click(profileIcon);
    const currentUrl = history.location.pathname;
    expect(currentUrl).toBe('/perfil');
  });

  it('tem uma barra de busca funcional e dinâmica', () => {
    const { getByRole, getByAltText, getAllByRole } = renderWithRouter(<Comidas />);
    const numberOfRadios = 3;
    const radioLabels = ['ingredient-filter', 'name-filter', 'first-letter-filter'];

    const searchIcon = getByAltText('search');
    fireEvent.click(searchIcon);
    const searchBar = getByRole('navigation');
    const searchInput = getByRole('textbox');
    const radioFilters = getAllByRole('radio');
    const searchButton = getByRole('button', { name: 'Pesquisar' });
    expect(searchBar).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(radioFilters.length).toEqual(numberOfRadios);
    expect(searchButton).toBeInTheDocument();

    radioLabels.forEach((label, index) => {
      expect(radioFilters[index].value).toBe(label);
    });
  });

  it('tem um footer com botões para as páginas de comida, bebida e explorar', () => {
    const { history, getByRole, getByAltText } = renderWithRouter(<Comidas />);

    const footerElement = getByRole('contentinfo');
    const drinksButton = getByAltText('drinks section');
    const exploreButton = getByAltText('explore section');
    const mealsButton = getByAltText('meals section');
    expect(footerElement).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();

    fireEvent.click(drinksButton);
    let currentUrl = history.location.pathname;
    expect(currentUrl).toBe('/bebidas');

    history.push('/comidas');

    fireEvent.click(exploreButton);
    currentUrl = history.location.pathname;
    expect(currentUrl).toBe('/explorar');

    history.push('/comidas');

    fireEvent.click(mealsButton);
    currentUrl = history.location.pathname;
    expect(currentUrl).toBe('/comidas');
  });

  it('renderiza cards de receitas', async () => {
    const { getAllByRole } = renderWithRouter(<Comidas />);
    const cardsQuantity = 12;

    const cardsNumber = await waitForElement(
      () => getAllByRole('img', { name: 'Receita' }),
      { document },
    );

    expect(cardsNumber.length).toEqual(cardsQuantity);
  });
});
