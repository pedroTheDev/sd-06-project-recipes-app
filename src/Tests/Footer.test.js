import React from 'react';
import renderWithRouter from './renderWithRouter';
import Footer from '../Components/Footer';

describe('Teste componente Footer', () => {
  it('Implemente os elementos respeitando os atributos descritos no protótipo', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const footerTest = getByTestId('footer');
    const drinksBtnTest = getByTestId('drinks-bottom-btn');
    const exploreBtnTest = getByTestId('explore-bottom-btn');
    const foodBtnTest = getByTestId('food-bottom-btn');

    expect(footerTest).toBeInTheDocument();
    expect(drinksBtnTest).toBeInTheDocument();
    expect(exploreBtnTest).toBeInTheDocument();
    expect(foodBtnTest).toBeInTheDocument();
  });

  it.only('Posicione o menu inferior de forma fixa e apresente 3 ícones', () => {
    const { getByTestId, container } = renderWithRouter(<Footer />);
    const footerTest = container.querySelector('.footer');
    const footerStyleTest = getByTestId('footer');
    // const style = window.getComputedStyle(footerStyleTest).getPropertyValue('position');
    console.log(footerTest.style);
    expect(footerTest).toHaveStyle('position: fixed');
    expect(footerTest).toHaveStyle('bottom: 0');
  });

  it('Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {

  });
});
