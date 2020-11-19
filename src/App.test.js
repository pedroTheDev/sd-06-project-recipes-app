import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
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
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument('');
    expect(password).toBeInTheDocument('');
    expect(button).toBeInTheDocument('');
    expect(button.value).toBe('Entrar')
  });
})
