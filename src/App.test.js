import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import renderWithRouter from './helpers/renderWithRouter';

test('Farewell, front-end', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});

describe('test LoginPage', () => {
  const { queryByTestId, history } = renderWithRouter(<Login />)
  expect(history.location.pathname).toBe('/');
  const email = queryByTestId('email-input');
  const password = queryByTestId('password-input');
  const loginButton = queryByTestId('login-submit-btn');
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(loginButton.innerText).toBe('Entrar');
});
