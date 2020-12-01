import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { ReceitasFavoritas } from '../pages';

describe('Possui uma página de Receitas Feitas', () => {
  it('Possui 2 botões de filtrar e 1 para remover filtros', () => {
    // const { getByTestId, history } = renderWithRouter(<ReceitasFavoritas />);
    // history.push('/receitas-feitas');
    // const filterAllBtn = getByTestId('filter-by-all-btn');
    // const filterFoodBtn = getByTestId('filter-by-food-btn');
    // const filterDrinkBtn = getByTestId('filter-by-drink-btn');

    // expect(filterAllBtn).toBeInTheDocument();
    // expect(filterFoodBtn).toBeInTheDocument();
    // expect(filterDrinkBtn).toBeInTheDocument();
  });
});
