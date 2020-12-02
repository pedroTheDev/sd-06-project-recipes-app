import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('A tele de explorar deve possuir:', () => {
  it('Possui 2 botões, um para explorar comidas e outro para explorar bebidas:', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const explorarComidaBtn = getByTestId('explore-food');
    const explorarBebidaBtn = getByTestId('explore-drinks');

    expect(explorarComidaBtn).toBeInTheDocument();
    expect(explorarBebidaBtn).toBeInTheDocument();
  });

  it('Deve possuir os textos `Explorar Comidas`e `Explorar Bebidas`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const textComidas = getByText(/Explorar Comidas/i);
    const textBebidas = getByText(/Explorar Bebidas/i);

    expect(textComidas).toBeInTheDocument();
    expect(textBebidas).toBeInTheDocument();
  });

  it('Redireciona para a página de explorar comidas ou explorar bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const explorarComidaBtn = getByTestId('explore-food');
    // const explorarBebidaBtn = getByTestId('explore-drinks');

    fireEvent(explorarComidaBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');

    // fireEvent(explorarBebidaBtn)
  });
});
