import React from 'react';
// import { fireEvent } from '@testing-library/react';
import { Login } from '../pages';
import renderWithRouter from '../services/renderWithRouter';

describe('Testar a página de login renderiza normalmente', () => {
  it('Possui input e-mail que faz a validação', () => {
    const { getByTestId, getByPlaceholderText } = renderWithRouter(<Login />);

    const inputEmail = getByTestId('email-input');
    const inputNode = getByPlaceholderText('Digite seu Email');

    inputEmail.value = 'teste@email.com';

    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(inputEmail.value).toLowerCase());

    expect(isValid).toBe(true);
    expect(inputEmail).toBeInTheDocument();
    expect(inputNode).toBeInTheDocument();
  });

  it('Possui input senha que faz validação', () => {
    const { getByTestId, getByPlaceholderText } = renderWithRouter(<Login />);

    const inputPassword = getByTestId('password-input');
    const inputNode = getByPlaceholderText('Digite sua Senha');

    const MIN_LENGTH = 7;

    inputPassword.value = '1234567';

    expect(inputPassword.value).toHaveLength(MIN_LENGTH);
    expect(inputPassword).toBeInTheDocument();
    expect(inputNode).toBeInTheDocument();
  });

  it('Possui botão que é habilitado caso as validações estejam corretas', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');
    const submitBtn = getByTestId('login-submit-btn');

    expect(submitBtn).toBeDisabled(true);
    inputEmail.value = 'teste@email.com';
    inputPassword.value = '1234567';

    expect(submitBtn).toBeDisabled(false);
  });
});
