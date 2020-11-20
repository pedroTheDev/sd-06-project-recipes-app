import React, { useState } from 'react';
import renderWithRouter from './renderWithRouter';
import Food from './pages/Food';
import AppProvider from './provider/AppProvider';

describe('testando os elementos do header na tela principal de receitas', () => {
  it('se é exibido os data-testids profile-top-btn, page-title e search-top-btn', () => {
    const { getByTestId } = renderWithRouter(
      <AppProvider>
        <Food />
      </AppProvider>);
    const profile = getByTestId('profile-top-btn');
    const page = getByTestId('page-title');
    const search = getByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(page).toBeInTheDocument();
    });
});
