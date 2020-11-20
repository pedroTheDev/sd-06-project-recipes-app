import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './tests/renderWithRouter';
import App from './App';

// test('Farewell, front-end', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/TRYBE/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Tela de Login - todos os elementos devem respeitar os atributos', () => {
  beforeEach(cleanup);

  it('O input email deve possuir o atributo data-testid correto', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument('');
    expect(password).toBeInTheDocument('');
    expect(button).toBeInTheDocument('');
  });
});

describe('Tela de Login - Formulario só será valido se ambos email e senha sejam validos', () => {
  beforeEach(cleanup);

  it('O botão deve estar desativado se o email for invalido', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    userEvent.type(email, 'email@com@');
    userEvent.type(password, 'dhs3u8d');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'jdu46cs');
    expect(button).toBeEnabled();
  });

  it('O botão deve estar desativado se a senha tiver 6 ou menos caracteres', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'dj3');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'jdu46cd');
    expect(button).toBeEnabled();
  });

  it('O botão deve estar desativado se o email for invalido', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');
    
    userEvent.type(email, 'jaksjdl');
    userEvent.type(password, '1234');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'jdu46ac');
    expect(button).toBeEnabled();
  });
})
