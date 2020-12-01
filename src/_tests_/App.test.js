import React from 'react';
import { waitForElement } from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('As seguintes rodas existem:', () => {
  it('Possui uma página de Login', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const login = getByText(/Login/i);
    history.push('/');
    expect(login).toBeInTheDocument();
  });

  it('Possui uma página de Comidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');

    const comidas = getByText(/Comidas/i);
    expect(comidas).toBeInTheDocument();
  });

  it('Possui uma página de Bebidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');

    const bebidas = getByText(/Bebidas/i);
    expect(bebidas).toBeInTheDocument();
  });

  it('Possui uma página de Detalhes da Receita para Comidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/bebidas/52978');

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/52978');

    const nomeComida = getByText(/Kumpir/i);
    expect(nomeComida).toBeInTheDocument();
  });

  it('Possui uma página de Detalhes da Receita para Bebidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/bebidas/15997');

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/15997');

    const nomeBebida = getByText(/GG/i);
    expect(nomeBebida).toBeInTheDocument();
  });

  it('Possui uma página de Progresso da Receita para Comidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/comidas/52978/in-progress');

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52978/in-progress');

    const nomeComida = getByText(/Kumpir/i);
    expect(nomeComida).toBeInTheDocument();
  });

  it('Possui uma página de Progresso da Receita para Bebidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/bebidas/15997/in-progress');

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/15997/in-progress');

    const nomeBebida = getByText(/GG/i);
    expect(nomeBebida).toBeInTheDocument();
  });

  it('Possui uma página explorar', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');

    const explorar = getByText(/Explorar/i);
    expect(explorar).toBeInTheDocument();
  });

  it('Possui uma página explorar Comidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');

    const explorarComidas = getByText(/Explorar Comidas/i);
    expect(explorarComidas).toBeInTheDocument();
  });

  it('Possui uma página explorar Bebidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');

    const explorarBebidas = getByText(/Explorar Bebidas/i);
    expect(explorarBebidas).toBeInTheDocument();
  });

  it('Possui uma página explorar Comidas por ingredientes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');

    const explorarIngredientes = getByText(/Explorar Ingredientes/i);
    expect(explorarIngredientes).toBeInTheDocument();
  });

  it('Possui uma página explorar Bebidas por ingredientes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/ingredientes');

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');

    const explorarIngredientes = getByText(/Explorar Ingredientes/i);
    expect(explorarIngredientes).toBeInTheDocument();
  });

  it('Possui uma página explorar comidas por local de origem', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/area');

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');

    const explorarOrigem = getByText(/Explorar Origem/i);
    expect(explorarOrigem).toBeInTheDocument();
  });

  it('Possui uma página de perfil', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/perfil');

    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');

    const perfil = getByText(/Perfil/i);
    expect(perfil).toBeInTheDocument();
  });

  it('Possui uma página de Receitas Feitas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');

    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');

    const receitasFeitas = getByText(/Receitas Feitas/i);
    expect(receitasFeitas).toBeInTheDocument();
  });

  it('Possui uma página de Receitas Favoritas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');

    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');

    const receitasFavoritas = getByText(/Receitas Favoritas/i);
    expect(receitasFavoritas).toBeInTheDocument();
  });
});
