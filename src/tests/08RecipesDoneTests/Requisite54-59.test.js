import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../../App';
import RevenueContext from '../../context/RevenueContext';
import MainPage from '../../pages/MainPage';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import renderWithRouter2 from '../renderWithRouter/renderWithRouter2';

describe('54 - Implemente os elementos da tela de receitas '
  + 'feitas respeitando os atributos descritos no protótipo', () => {
  it('O botão de filtro All deve ter o atributo '
    + 'data-testid="filter-by-all-btn"', async () => {
    const { history, findByTestId } = renderWithRouter((<App />));
    history.push('receitas-favoritas');

    const filterByAllButton = await findByTestId('filter-by-all-btn');
    expect(filterByAllButton).toBeTruthy();
  });

  it('O botão de filtro Food deve ter o atributo '
    + 'data-testid="filter-by-food-btn"', async () => {
    const { history, findByTestId } = renderWithRouter((<App />));
    history.push('receitas-favoritas');

    const filterByFoodButton = await findByTestId('filter-by-food-btn');
    expect(filterByFoodButton).toBeTruthy();
  });

  it('O botão de Drinks deve ter o atributo '
    + 'data-testid="filter-by-drink-btn"', async () => {
    const { history, findByTestId } = renderWithRouter((<App />));
    history.push('receitas-favoritas');

    const filterByDrinkButton = await findByTestId('filter-by-drink-btn');
    expect(filterByDrinkButton).toBeTruthy();
  });
});

describe('Done Recipes', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => (`[
          { "id": "52771", "type": "Meal", "area": "Italian", "category": "Vegetarian", "alcoholicOrNot": "", "name": "Spicy Arrabiata Penne", "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg", "tags": [] },
          { "id": "52772", "type": "Drink", "area": "Rusian", "category": "Test", "alcoholicOrNot": "Yes", "name": "Test", "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg", "tags": ["Pasta", "Curry"] }
        ]`)),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('', async () => {
    const mockValue = {
      search: 'Teste',
      searchButton: false,
      setSearchButton: jest.fn(),
      setSearch: jest.fn(),
      selectedFilter: 'Meal',
    };

    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <MainPage title="Receitas Feitas" />
      </RevenueContext.Provider>,
    );

    const filterByFoodBtn = getByTestId('filter-by-food-btn');
    fireEvent.click(filterByFoodBtn);

    const filterByDrinkBtn = getByTestId('filter-by-drink-btn');
    fireEvent.click(filterByDrinkBtn);

    const filterByAllBtn = getByTestId('filter-by-all-btn');
    fireEvent.click(filterByAllBtn);

    const ZERO = 0;
    const TWO = 2;

    for (let index = ZERO; index < TWO; index += 1) {
      expect(getByTestId(`${index}-horizontal-done-date`)).toBeInTheDocument();
    }
  });
});
