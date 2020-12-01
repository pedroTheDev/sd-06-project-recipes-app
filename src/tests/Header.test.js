import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter'
import { cleanup } from '@testing-library/react';
import App from '../App';
import Comidas from '../Pages/Comidas';
import Provider from '../Context/Provider';

afterEach(cleanup);

describe('9 - Implemente os elementos do header na tela principal de receitas, respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Comidas />
      </Provider>
    );

    const profileTopBtn = getByTestId('profile-top-btn')
    const pageTitle = getByTestId('page-title')
    const SearchTopBar = getByTestId('search-top-btn')
    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(SearchTopBar).toBeInTheDocument();
  })
})

describe('10 - Implemente um ícone para a tela de perfil, um título e um ícone para a busca, caso exista no protótipo', () => {

  afterEach(cleanup);
  
  it('não deve ter os botões em Loguin', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <App />
      </Provider>
    );
    
    const profileTopBtn = queryByTestId('profile-top-btn')
    const pageTitle = queryByTestId('page-title')
    const SearchTopBar = queryByTestId('search-top-btn')

    expect(profileTopBtn).toBe(null);
    expect(pageTitle).toBe(null);
    expect(SearchTopBar).toBe(null);
  })

  it('O header tem os ícones corretos na tela de principal de receitas de comidas', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <Comidas />
      </Provider>
    );

    const profileTopBtn = queryByTestId('profile-top-btn')
    const pageTitle = queryByTestId('page-title')
    const SearchTopBar = queryByTestId('search-top-btn')

    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(SearchTopBar).toBeInTheDocument();
  })
})
