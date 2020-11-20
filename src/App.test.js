import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Login from './pages/Login'
import App from './App';
import renderWithRouterAndStore from './helpers/testConfig';



const getLocalStorageData = (key) => JSON.parse(localStorage.getItem(key));

describe('test LoginPage', () => {
  test('test emailInput and PasswordInput', () => {
    const { history, queryByTestId } = renderWithRouterAndStore(<App />)
    history.push('/');
    expect(history.location.pathname).toBe('/');
    const emailInput = queryByTestId('email-input');
    const loginButton = queryByTestId('login-submit-btn');
    const password = queryByTestId('password-input');
    expect(emailInput).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.innerText).toBe('Entrar');
    expect(loginButton.disabled).toBe(true);
    fireEvent.change(emailInput, { target: {value: 'p$'}})
    expect(loginButton.disabled).toBe(true);
    fireEvent.change(emailInput, { target: {value: 'paulo.'}})
    expect(loginButton.disabled).toBe(true);
    fireEvent.change(emailInput, { target: {value: 'paulo@'}})
    expect(loginButton.disabled).toBe(true);
    fireEvent.change(emailInput, { target: {value: 'paulo@email'}})
    expect(loginButton.disabled).toBe(true);
    fireEvent.change(emailInput, { target: {value: 'paulo@email.com'}})
    expect(loginButton.disabled).toBe(true);
    fireEvent.change(password, { target: {value: '123'}})
    expect(loginButton.disabled).toBe(true);
    fireEvent.change(password, { target: {value: '123456'}})
    expect(loginButton.disabled).toBe(true);
    fireEvent.change(password, { target: {value: '1234567'}})
    expect(loginButton.disabled).toBe(false);
  });

  // test('test submit button', () => {
  //   const { queryByTestId, history } = renderWithRouter(<Login />)
  //   expect(history.location.pathname).toBe('/');    
  //   const loginButton = queryByTestId('login-submit-btn');
  //   const emailInput = queryByTestId('email-input');
  //   const password = queryByTestId('password-input');
  //   fireEvent.change(emailInput, { target: {value: 'paulo@email.com'}});
  //   fireEvent.change(password, { target: {value: '1234567'}});
  //   expect(getLocalStorageData('user')).toBeFalsy();
  //   fireEvent.click(loginButton);
  //   expect(getLocalStorageData('user')).toBeTruthy();
  // });
});

