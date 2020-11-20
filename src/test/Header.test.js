import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';
import Explore from '../pages/Explore';
import ExploreByArea from '../pages/ExploreByArea';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinkIngredients from '../pages/ExploreDrinkIngredients';
import ExploreFoodIngredients from '../pages/ExploreFoodIngredients';
import FavoritesRecipes from '../pages/FavoritesRecipes';
import FinishedRecipes from '../pages/FinishedRecipes';
import Profile from '../pages/Profile';
import Food from '../pages/Food';
import Drink from '../pages/Drink';
import DrinkDetails from '../pages/DrinkDetails';
import FoodDetails from '../pages/FoodDetails';
import FoodInProgress from '../pages/FoodInProgress';
import DrinkInProgress from '../pages/DrinkInProgress';
import AppProvider from '../provider/AppProvider';

describe('testando os elementos do footer na tela principal de receitas', () => {
  it('O footer tem os ícones corretos na tela de principal de receitas de comida', () => {
    const { getByTestId } = renderWithRouter(
      <AppProvider>
        <Food />
      </AppProvider>,
    );
    const drinks = getByTestId('drinks-bottom-btn');
    const explore = getByTestId('explore-bottom-btn');
    const food = getByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(explore).toHaveTextContent('Comidas');
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
});

describe('testando um ícone para a tela de perfil', () => {
  it('Não tem footer na tela de login;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <Login />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });

  it('O footer tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <Drink />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveTextContent('Bebidas');
  });

  it('Não tem footer na tela de detalhes de uma receita de comida;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <FoodDetails />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de detalhes de uma receita de bebida;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <DrinkDetails />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de receita em processo de comida', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <FoodInProgress />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de receita em processo de bebida;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <DrinkInProgress />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });

  it('O footer tem os ícones corretos na tela de explorar;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <Explore />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveTextContent('Explorar');
  });

  it('O footer tem os ícones corretos na tela de explorar comidas;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <ExploreFoods />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveTextContent('Explorar Comidas');
  });

  it('O footer tem os ícones corretos na tela de explorar bebidas;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <ExploreDrinks />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveTextContent('Explorar Bebidas');
  });

  it('O footer tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <ExploreFoodIngredients />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveTextContent('Explorar Ingredientes');
  });

  it('O footer tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <ExploreDrinkIngredients />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveTextContent('Explorar Ingredientes');
  });

  it('O footer tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <ExploreByArea />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveTextContent('Explorar Origem');
  });

  it('O footer tem os ícones corretos na tela de perfil;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <drinks />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveTextContent('Perfil');
  });

  it('O footer tem os ícones corretos na tela de receitas feitas;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <FinishedRecipes />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveTextContent('Receitas Feitas');
  });

  it('O footer tem os ícones corretos na tela de receitas favoritas;', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <FavoritesRecipes />
      </AppProvider>,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveTextContent('Receitas Favoritas');
  });
});

describe('testando o botão de busca', () => {
  it('ao ser clicado, a barra de busca deve aparecer', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <Food />
      </AppProvider>,
    );
    const foodButton = queryByTestId('food-bottom-btn');
    fireEvent.click(foodButton);
    const input = queryByTestId('food-input');
    expect(input).toBeInTheDocument();
    fireEvent.click(foodButton);
    expect(input).not.toBeInTheDocument();
  });
});
