import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderApp from '../helpers/renderApp';
import App from '../App';

describe('Testes da Tela de Login', () => {
  it('Testa a Renderização dos campos login, email e do botão', () => {
    const { getByTestId } = renderApp(<App />);

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const btn = getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('Testa o botão com a senha vazia e email válido', () => {
    const { getByTestId, history } = renderApp(<App />);

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const btn = getByTestId('login-submit-btn');

    fireEvent.change(email, { target: { value: 'lalala@gmail.com' } });
    fireEvent.click(btn);

    const path = history.location.pathname;

    expect(email.value).toBe('lalala@gmail.com');
    expect(password.value).toBe('');
    expect(path).toBe('/');
  });

  it('Testa se, com email e senha corretos, leva para a página de comidas', () => {
    const { getByTestId, history } = renderApp(<App />);

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const btn = getByTestId('login-submit-btn');
  
    fireEvent.change(email, { target: { value: 'lalala@gmail.com' } });
    fireEvent.change(password, { target: { value: 'kameHameHaaaaaa01' } });

    expect(btn.disabled).toBe(false);

    fireEvent.click(btn);

    const path = history.location.pathname;

    expect(path).toBe('/comidas');
  });
});
