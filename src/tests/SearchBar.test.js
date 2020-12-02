import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { fireEvent, render, screen, waitForElement  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import App from '../App';

describe('1. Barra de buscas', () => {
  it('1. Se existem os data-test-ids corretos', () => {
    const { queryByTestId } = renderWithRouter(<Header pathname="/comidas" />);
    const searchBtn = screen.queryByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const tInput = queryByTestId('search-input');
    const iButton = queryByTestId('ingredient-search-radio');
    const nButton = queryByTestId('name-search-radio');
    const fButton = queryByTestId('first-letter-search-radio');
    const btnSearch = queryByTestId('exec-search-btn');
    expect(tInput).toBeInTheDocument();
    expect(iButton).toBeInTheDocument();
    expect(nButton).toBeInTheDocument();
    expect(fButton).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });

  it('2. Fazer uma busca por ingrediente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas')

    await waitForElement(() => screen.getByTestId('search-top-btn'));
    const searchBtn = screen.getByTestId('search-top-btn');
    fireEvent.click(searchBtn);

    const tInput = screen.queryByTestId('search-input');
    userEvent.type(tInput, 'chicken');
    const iButton = screen.queryByTestId('ingredient-search-radio');
    userEvent.click(iButton);
    const btnSearch = screen.queryByTestId('exec-search-btn');
    userEvent.click(btnSearch);
    await screen.findByTestId('0-recipe-card');
    expect('Brown Stew Chicken').toBeInTheDocument();
  });
















    // const data = { meals: [
    //   { strMeal: 'Chicken Handi',
    //     idMeal: '52795',
    //     strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg', },
    //   { strMeal: 'Chicken Congee',
    //     idMeal: 52956,
    //     strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446352.jpg', },
    // ] };
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(data),
    // }));
    // expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');



  // it('2 Fazer uma busca por nome', async () => {
  //   const { history, queryByTestId } = renderWithRouter(<Header pathname="/comidas" />);
  //   const searchBtn = queryByTestId('search-top-btn');
  //   fireEvent.click(searchBtn);
  //   const tInput = queryByTestId('search-input');
  //   userEvent.type(tInput, 'chicken');
  //   const nButton = queryByTestId('name-search-radio');
  //   userEvent.click(nButton);
  //   const btnSearch = queryByTestId('exec-search-btn');
  //   userEvent.click(btnSearch);
  // });
});
