import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Login } from '../pages';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

// describe('Testar a página de login renderiza normalmente', () => {
//   it('Possui input e-mail que faz a validação', () => {
//     const { getByTestId, getByPlaceholderText } = renderWithRouter(<Login />);

//     const inputEmail = getByTestId('email-input');
//     const inputNode = getByPlaceholderText('Digite seu Email');

//     inputEmail.value = 'teste@email.com';

//     const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//     const isValid = validator.test(String(inputEmail.value).toLowerCase());

//     expect(isValid).toBe(true);
//     expect(inputEmail).toBeInTheDocument();
//     expect(inputNode).toBeInTheDocument();
//   });
// });
