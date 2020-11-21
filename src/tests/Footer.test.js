import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Menu inferior', () => {
  it('19 - Os botões de drinks, explorar e comida são renderizados', () => {
    const { getByTestId } = render(<Footer />);

    const drinksButton = getByTestId('drinks-bottom-btn');
    const exploreButton = getByTestId('explore-bottom-btn');
    const foodButton = getByTestId('food-bottom-btn');

    expect(drinksButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
  });

  it('20 - O menu apresenta os 3 botões corretamente: um para comidas, um para bebidas e outro para exploração ', () => {
    const { getByTestId } = render(<Footer />);

    const drinkIcon = getByTestId('drink-icon-svg');
    const exploreIcon = getByTestId('explore-icon-svg');
    const foodIcon = getByTestId('meal-icon-svg');

    expect(drinkIcon).toBeInTheDocument();
    expect(exploreIcon).toBeInTheDocument();
    expect(foodIcon).toBeInTheDocument();
  });

  it.skip('21 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {

  });

  it('22 - Redirecione a pessoa usuária para uma lista de cocktails ao clicar no ícone de bebidas', () => {

  });

  it('23 - Redirecione a pessoa usuária para a tela de explorar ao clicar no ícone de exploração', () => {

  });

  it('24 - Redirecione a pessoa usuárua para uma lista de comidas ao clicar no ícone de comidas', () => {

  });
});
