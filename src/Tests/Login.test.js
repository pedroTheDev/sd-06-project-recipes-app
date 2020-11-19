import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../Pages/Login';

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
});
