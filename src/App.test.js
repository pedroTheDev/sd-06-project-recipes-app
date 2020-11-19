import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from './App';

// describe('1 - Desenvolva os testes unitários de maneira que a cobertura seja de, no mínimo, 90%', () => {  it('Verifica a cobertura de testes unitários', () => {    cy.exec('npm run test-coverage -- --coverageReporters="json-summary" --testFailureExitCode=0');    cy.readFile('coverage/coverage-summary.json').its('total.lines.pct').should('be.gte', 90.00);  });});

describe('Login Page', () => {
  it('Requisito 2', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonSubmit = getByTestId('login-submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });

  it('Requisito 3, 4, 5, 6, 7', () => {
    const { getByTestId, getByText, history } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonSubmit = getByTestId('login-submit-btn');
    fireEvent.change(emailInput, { target: { value: 'a@a.com'}})
    fireEvent.change(passwordInput, { target: { value: '123456'}})
    fireEvent.click(buttonSubmit);
    const foodPageText = getByText('FOOD');
    expect(foodPageText).toBeInTheDocument();
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');

    const email = localStorage.getItem('user')
    expect(email).toBe('{"email":"a@a.com"}')
    expect(history.location.pathname).toBe('/comidas');
  });

});
