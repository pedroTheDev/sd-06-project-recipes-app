import React from 'react';
// import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

test('60 - Implemente os elementos da tela de '
  + 'receitas favoritas (cumulativo com os atributos '
  + 'em comum com a tela de receitas feitas) respeitando '
  + 'os atributos descritos no protótipo', async () => {
  const { findByTestId, history } = renderWithRouter(<App />);
  history.push('receitas-favoritas');

  const allFilterButton = await findByTestId('filter-by-all-btn');
  const foodFilterButton = await findByTestId('filter-by-food-btn');
  const drinksFilterButton = await findByTestId('filter-by-drink-btn');

  expect(allFilterButton).toBeInTheDocument();
  expect(foodFilterButton).toBeInTheDocument();
  expect(drinksFilterButton).toBeInTheDocument();
});

// describe('65 - Implemente 2 botões que filtram as receitas por comida '
//   + 'ou bebida e um terceiro que remove todos os filtros', () => {

// });
