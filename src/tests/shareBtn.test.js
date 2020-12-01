import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter'
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import { Comidas, Bebibas } from '../Pages';
import Provider from '../Context/Provider';

afterEach(cleanup);

describe('13 - Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids tanto da barra de busca quanto de todos os radio-buttons', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Comidas />
      </Provider>
    );
  
    const searchBtn = getByTestId('search-top-btn')
    fireEvent.click(searchBtn);
    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(getByTestId('name-search-radio')).toBeInTheDocument();
    expect(getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(getByTestId('exec-search-btn')).toBeInTheDocument();    
  });
});

describe('14 - Posicione a barra logo abaixo do header e implemente 3 radio buttons: Ingrediente, Nome e Primeira letra', () => {
  it('Se o radio selecionado for Ingrediente, a busca na API é feita corretamente pelo ingrediente', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Provider>
        <Comidas />
      </Provider>
    );
  
    const searchBtn = getByTestId('search-top-btn')
    fireEvent.click(searchBtn);
    fireEvent.click(getByTestId('ingredient-search-radio'))
    fireEvent.change(getByTestId('search-input'), { target: { value: 'chicken' } })
    expect(getByTestId('search-input').value).toBe('chicken'); 
    // fireEvent.click(getByTestId('exec-search-btn'))
    // expect(getByText('Selecione uma categoria')).toBeInTheDocument();
  })
})
