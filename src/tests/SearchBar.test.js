import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { fireEvent, screen  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import App from '../App';

describe('13 - Implemente os elementos da barra de busca', () => {
  beforeAll(() => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    const { pathname } = history.location;
    setTimeout(() => {
      expect(pathname).toBe('/comidas');
    }, 1500);
  });

  it('1. O input de busca deve possuir o atributo data-testid=search-input', () => {
    const { history } = renderWithRouter(<App />);
    const btnSearchHeader = screen.getAllByTestId('search-top-btn');
    fireEvent.click(btnSearchHeader[0]);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    expect(ingredientSearch).toBeInTheDocument();

    const nameSearch = screen.getByTestId('name-search-radio');
    expect(nameSearch).toBeInTheDocument();

    const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterSearch).toBeInTheDocument();

    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();
  });

  it('3. Realiza uma busca', () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    const btnSearchHeader = screen.getAllByTestId('search-top-btn');
    fireEvent.click(btnSearchHeader[0]);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    fireEvent.click(ingredientSearch);
    const btnSearch = screen.getByTestId('exec-search-btn');
    fireEvent.click(btnSearch);
    findByTestId('0-recipe-card');
  });



});
