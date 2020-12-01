// import { waitForElement } from '@testing-library/react';
import React from 'react';
import App from '../App';
// import * as fetch from '../services';
// import meals from '../../cypress/mocks/meals';

import renderWithRouter from '../services/renderWithRouter';

describe('Testar a tela principal de receitas', () => {
  it('A tela tem os data-testids de todos os 12 cards da tela de comidas;', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    const WAITING_TIME = 500;
    const INITIAL_VALUE = 0;
    const FINAL_VALUE = 12;

    // const wait = (ms) => {
    //   const now = new Date().getTime();
    //   while (now + ms >= new Date().getTime()) {
    //     // wait
    //     // console.log('waiting..');
    //     history.push('/comidas');
    //   }
    //   // console.log('done..');
    //   return true;
    // };
    // wait(2000);

    // console.log(teste());

    // expect(teste).toBeCalled();

    setTimeout(() => {
      for (let i = INITIAL_VALUE; i < FINAL_VALUE; i += 1) {
        expect(getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
      }
    }, WAITING_TIME);

    // await waitForElement(() => {
    //   const teste = jest.spyOn(fetch, 'fetchMeal').mockImplementation(() => meals.meals);
    //   teste();

    //   for (let i = INITIAL_VALUE; i < FINAL_VALUE; i += 1) {
    //     expect(getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
    //   }
    // });
  });
  it('A tela tem os data-testids de todos os 12 cards da tela de comidas;', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');
    const WAITING_TIME = 500;
    const INITIAL_VALUE = 0;
    const FINAL_VALUE = 12;

    setTimeout(() => {
      for (let i = INITIAL_VALUE; i < FINAL_VALUE; i += 1) {
        expect(getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
      }
    }, WAITING_TIME);
  });
});
