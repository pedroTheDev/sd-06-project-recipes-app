import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../Pages/Login';
import App from '../App';

describe('Teste página de Login', () => {
  it('Crie os elementos que devem respeitar os atributos descritos no protótipo', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailTest = getByTestId('email-input');
    const passwordTest = getByTestId('password-input');
    const buttonLoginTest = getByTestId('login-submit-btn');

    expect(emailTest).toBeInTheDocument();
    expect(passwordTest).toBeInTheDocument();
    expect(buttonLoginTest).toBeInTheDocument();
  });

  it('o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const button = getByTestId('login-submit-btn');
    expect(button).toBeDisabled();
    const email = getByTestId('email-input');
    const senha = getByTestId('password-input');
    userEvent.type(email, 'email');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();
    userEvent.type(email, 'email@com@');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();
    userEvent.type(email, 'emailcom@');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    expect(button).toBeEnabled();
  });

  /*
  it('Salve 2 tokens no localStorage após a submissão, pelas chaves', () => {
    const {  }
  });
  */
  it(' Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão com sucesso do login', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const email = getByTestId('email-input');
    const senha = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
