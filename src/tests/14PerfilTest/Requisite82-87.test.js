import React from 'react';
// import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

beforeAll(() => {
  const email = 'teste@teste.com';
  localStorage.user = JSON.stringify({ email });
});

// beforeEach(() => {
//   localStorage.clear();
// });

test.only('83 - Implemente a solução de maneira que o '
  + 'e-mail da pessoa usuária deve estar visível', async () => {
  const { findByTestId, history } = renderWithRouter(<App />);
  history.push('perfil');

  const profileEmail = await findByTestId('profile-email');
  // console.log(profileEmail.innerHTML);
  expect(profileEmail.innerHTML).toBe('teste@teste.com');

  // fireEvent.click(favoriteWhiteHeart);

  // const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  // // console.log(favoriteRecipes);
  // expect(favoriteRecipes).toBe(
});
