import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Login } from '../pages';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testar a barra de busca', () => {
  it('Possui 3 radio buttons: Ingrediente, Nome e Primeira letra', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const ingredient = getByTestId('ingredient-search-radio');
    const name = getByTestId('name-search-radio');
    const firstLetter = getByTestId('first-letter-search-radio');

    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
  });
});

describe('Testar a API chamada pela barra de busca', () => {
  it('Busque na API de comidas caso a pessoa esteja na página de comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const WAITING_TIME = 500;
    history.push('/comidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchinput = getByTestId('search-input');
    searchinput.value = 'salsa';

    const ingredient = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredient);

    const execSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(execSearchButton);

    setTimeout(() => {
      const recipeTitle = getByTestId('recipe-title');
      const meal = 'Cajun spiced fish tacos';
      expect(recipeTitle).toHaveTextContent(meal);
    }, WAITING_TIME);
  });

  it('Busque na API de bebidas caso a pessoa esteja na página de bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const WAITING_TIME = 500;

    history.push('/bebidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchinput = getByTestId('search-input');
    searchinput.value = 'Artillery Punch';

    const name = getByTestId('name-search-radio');
    fireEvent.click(name);

    const execSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(execSearchButton);

    setTimeout(() => {
      const recipeTitle = getByTestId('recipe-title');
      const drink = 'Artillery Punch';
      expect(recipeTitle).toHaveTextContent(drink);
    }, WAITING_TIME);
  });
});

describe('Testar detalhes da receita', () => {
  it('Redirecione para detalhes da receita se apenas uma receita seja encontrada', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const WAITING_TIME = 50;
    history.push('/comidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchinput = getByTestId('search-input');
    searchinput.value = 'salsa';

    const ingredient = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredient);

    setTimeout(() => {
      const execSearchButton = getByTestId('exec-search-btn');
      fireEvent.click(execSearchButton);
      expect(history.location.pathname).toHaveTextContent('52819');
    }, WAITING_TIME);
  });
});

describe('Testar alert', () => {
  it(' Exiba um alert caso nenhuma receita seja encontrada', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const WAITING_TIME = 50;
    history.push('/comidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchinput = getByTestId('search-input');
    searchinput.value = 'noingredient';

    const ingredient = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredient);

    setTimeout(() => {
      const execSearchButton = getByTestId('exec-search-btn');
      fireEvent.click(execSearchButton);
      const text = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
      expect(text).toBeInTheDocument();
    }, WAITING_TIME);
  });
});

// 13 - Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo
// 14 - Posicione a barra logo abaixo do header e implemente 3 radio buttons: Ingrediente, Nome e Primeira letra
// 15 - Busque na API de comidas caso a pessoa esteja na página de comidas e na de bebidas caso esteja na de bebidas
// 16 - Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL
// 17 - Mostre as receitas em cards caso mais de uma receita seja encontrada
// 18 - Exiba um alert caso nenhuma receita seja encontrada
