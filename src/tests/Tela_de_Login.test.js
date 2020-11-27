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

// describe('Testar ações após o click do botão ', () => {
//   it('Verifica as informações são salvas no localStorage', () => {
//     const { getByTestId, history } = renderWithRouter(<Login />);

//     const inputEmail = getByTestId('email-input');
//     const inputPassword = getByTestId('password-input');
//     const submitBtn = getByTestId('login-submit-btn');

//     // inputEmail.value = 'teste@email.com';
//     // inputPassword.value = '1234567';
//     expect(submitBtn).toBeDisabled(true);

//     fireEvent.change(inputEmail, { target: { value: 'teste@email.com' } });
//     fireEvent.change(inputPassword, { target: { value: '1234567' } });

//     expect(submitBtn).toBeDisabled(false);

//     fireEvent.click(submitBtn);

//     // expect(submitBtn).not.toBeInTheDocument();

//     // const path = history.location.pathname;
//     // expect(path).toBe('/comidas');

//     expect(localStorage.getItem('mealsToken')).toHaveValue('1');
//     expect(localStorage.getItem('cocktailsToken')).toBe('1');
//     expect(localStorage.getItem('user')).toBe({ email: 'teste@email.com' });
//   });

//   // it('Verifica se a página de comida é aberta após o click', () => {
//   //   expect(textHeading).toBeInTheDocument();
//   // });
// });

// describe('Testar se aplicação possui conjunto de links de navegação', () => {
//   it('Página deve possuir Home, About e Favorite Pokémons', () => {
//     const { getByText } = renderWithRouter(<App />);
//     expect(getByText('Home')).toBeInTheDocument();
//     expect(getByText('About')).toBeInTheDocument();
//     expect(getByText('Favorite Pokémons')).toBeInTheDocument();
//   });
// });

// describe('Testar se os links levam ao destino correto', () => {
//   it('Redirecionar para página /home ao clicar no link Home', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     fireEvent.click(getByText('Home'));
//     const path = history.location.pathname;
//     expect(path).toBe('/');
//     expect(getByText('Pokédex')).toBeInTheDocument();
//   });

//   it('Redirecionar para página /about ao clicar no link About', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     fireEvent.click(getByText('About'));
//     const path = history.location.pathname;
//     expect(path).toBe('/about');
//     expect(getByText('About Pokédex')).toBeInTheDocument();
//   });

//   it('Redirecionar para página /favorites ao clicar no link Favorite Pokémons', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     fireEvent.click(getByText('Favorite Pokémons'));
//     const path = history.location.pathname;
//     expect(path).toBe('/favorites');
//     expect(getByText('Favorite pokémons')).toBeInTheDocument();
//   });

//   it('Redirecionar para página Not Found ao entrar em uma URL desconhecida', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     history.push('/any');
//     expect(getByText('Page requested not found')).toBeInTheDocument();
//   });
// });
